"use strict";
require("dotenv").config();
const URLCommandBase = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/`;
const URLExecuteMacro = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/ExecMacroUIExt`;
const URLInteractWithServer = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?SkhMc20wbi9JemxhR1N1ZWhObzhHUT09X3JVRm53QTRCbHpWRVFLSWlPUkFvZGc9PQ2`;
const URLSearch = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/DataViewMgr.svc/dotnet`;

const axios = require("axios");
const xml2js = require("xml2js");
const Database = require("../database/db");
const { parseErrorCode } = require("../helpers/errorParser");
const { generateSearchQuery, decodeFromAsteaGibberish } = require("../helpers/querying");
const { parseXMLToJSON } = require("../helpers/xml");
const { AsteaError } = require("./AsteaError");
const ServiceOrder = require("./ServiceOrder");
const Search = require("../helpers/Search");
const { ORDERS_EXPIRE_IN_MINUTES } = process.env;

const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    // "CurrentProfile": "Prod"
}

function formatExecuteMacroBody(macroName, isInHistory, sessionID, ...params) {
    return {
        "macroName": macroName,
        "bcName": isInHistory ? "Service_Order_History" : "Service_Order",
        "boAlias": "main",
        "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>${params[0]}</value></array></xml>`,
        "sessionId": sessionID,
        "stateId": -1,
        "saveState": false,
        "closeState": false,
        "xmlRequest": formatXmlRequest(isInHistory),
        "moduleName": "service_order_maint"
    };
}

function formatXmlRequest(isInHistory) {
    if (isInHistory) {
        return `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'>
            <GetCurrentState pageName='service_request_history_maint' stateID='-1'>
                <BO alias='main'></BO>
                <BO alias='pcode_order_xref'></BO>
                <BO alias='cause_order_xref'></BO>
                <BO alias='rcode_order_xref'></BO>
                <BO alias='address_xref'></BO>
                <BO alias='demand_labor_history'></BO>
                <BO alias='demand_material_history'></BO>
                <BO alias='order_items'></BO>
                <BO alias='demand_service_history'></BO>
                <BO alias='checklist_for_order_hdr'></BO>
                <BO alias='checklist_for_order_goods'></BO>
                <BO alias='checklist_for_order_items'></BO>
                <BO alias='checklist_for_order_services'></BO>
            </GetCurrentState>
        </root>`;
    }
    return `
    <root xmlns:dt='urn:schemas-microsoft-com:datatypes'>
        <GetCurrentState pageName='service_request_maint' stateID='-1'>
            <BO alias='main'></BO>
            <BO alias='address_xref'></BO>
            <BO alias='demand_labor'></BO>
            <BO alias='demand_availability'></BO>
            <BO alias='order_general_xref'></BO>
            <BO alias='demand_link_xref_on_order'></BO>
            <BO alias='access_hours'></BO>
            <BO alias='checklist_for_order_hdr'></BO>
            <BO alias='checklist_for_order_goods'></BO>
            <BO alias='checklist_for_order_items'></BO>
            <BO alias='checklist_for_order_services'></BO>
        </GetCurrentState>
    </root>`;
}

function formatCommandBody(stateID, sessionID, command) {
    return {
        "stateId": stateID,
        "sessionId": sessionID,
        "bcName": "Service_Order",
        "xmlRequest":
            `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'>
                <GetCurrentState pageName='service_request_maint' stateID='${stateID}'>
                <BO alias='${command}'></BO>
                </GetCurrentState>
            </root>`,
        "moduleName": "service_order_maint"
    }
}

function formatSearchBody(sessionID, criteria) {
    return `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
        <s:Header>
            <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
        </s:Header>
        <s:Body>
            <RetrieveXMLExt xmlns="http://astea.services.wcf/">
                <sessionID>${sessionID}</sessionID>
                <XMLCriteria>
                    ${generateSearchQuery(criteria)}
                </XMLCriteria>
            </RetrieveXMLExt>
        </s:Body>
    </s:Envelope>`;
}

async function orderLocatorSearch(session, criteria) {
    const precached = await Search.get(criteria);
    if (precached) return precached.results;

    const searchBody = formatSearchBody(session.sessionID, criteria);
    const resp = await axios.post(URLSearch, searchBody,
        {
            headers: {
                //...headers,
                "Content-Type": "text/xml; charset=utf-8",
                "currentprofile": "Prod",
                "SOAPAction": "\"http://astea.services.wcf/IDataViewMgrContract/RetrieveXMLExt\""
            }
        }
    );

    const json = await parseXMLToJSON(resp.data);
    const resultsEncodedXML = json["s:Envelope"]["s:Body"][0]["RetrieveXMLExtResponse"][0]["RetrieveXMLExtResult"][0]; //Make these nasties a little cleaner.
    const resultsXML = decodeFromAsteaGibberish(resultsEncodedXML);
    const resultsJSON = await parseXMLToJSON(resultsXML);
    const serviceOrders = await extractFromResults(resultsJSON);
    Search.create(criteria, serviceOrders);

    return serviceOrders;
    //TODO this function needs error handling
}

async function extractFromResults(results) {
    const serviceOrders = [];
    if (!results.root.row) {
        return []; //Found nothing
    }

    const promises = results.root.row.map(async svRawData => {
        const id = svRawData.order_id[0]._;
        return new Promise(async (resolve, reject) => {
            const serviceOrder = await ServiceOrder.retrieve(svRawData, 1);
            Database.setServiceOrder(id, serviceOrder);
            resolve(serviceOrder);
        });
    });

    return await Promise.all(promises);
}

async function retrieveSV(id, isInHistory, session) {
    const cached = await Database.getServiceOrder(id); //If the cached work order is less than 60 minutes old, we can use the cached version
    if (cached) {
        console.log(`Found cached service order. Completness: ${cached.completeness} Age: ${cached.getAgeInMinutes()} minuites`);

    }
    const sessionID = session.sessionID;

    if (cached && cached.getAgeInMinutes() < ORDERS_EXPIRE_IN_MINUTES && cached.completeness > 2) {
        console.log("Returning cached");
        return { serviceOrder: cached };
    }

    const resp = await axios.post(
        URLExecuteMacro,
        formatExecuteMacroBody("retrieve", isInHistory, sessionID, id)
    ); //Execute Astea Macro retrieve

    if (resp.data.ExceptionDetail) {
        if (isInHistory) {
            const error = await parseErrorMessage(resp.data);
            throw new AsteaError(resp.data.ExceptionDetail.Type, error?.status || 500, error?.message || `[${id}]: Astea threw an exception. \n ${resp.data.ExceptionDetail.Type}`);
        } else {
            return await retrieveSV(id, true, session);
        }
    }

    const json = await interpretMacroResponse(resp.data['d']); //Convert XML response to Json\
    const { stateID, hostName } = getOrderMetadata(json); //Get state-id from the JSON

    const respInteractions = await getInteractions(stateID, hostName, sessionID);
    const respMaterials = await getMaterials(stateID, hostName, sessionID);

    const serviceOrder = await ServiceOrder.retrieve(json.root.main[0].row[0], 3); //3 has interactions, materials and proper SV data

    serviceOrder.parseInteractions(respInteractions);
    serviceOrder.parseMaterials(respMaterials);

    Database.setServiceOrder(id, serviceOrder); //Update the cache

    return { serviceOrder, json, respInteractions };
}

async function parseErrorMessage(data) {
    const messageJSON = await new Promise((resolve, reject) => {
        xml2js.parseString(data.ExceptionDetail.Message, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

    return parseErrorCode(messageJSON.root.MessageAsteaCode);
}

async function getInteractions(stateID, hostName, sessionID) {
    const resp = await axios.post(
        `${URLCommandBase}/GetStateUIExt?${hostName}`,
        formatCommandBody(stateID, sessionID, "customer_authorization"),
        { headers }
    );

    //Convert XML to Json
    const json = await interpretMacroResponse(resp.data['d']);
    return json;
}

async function getMaterials(stateID, hostName, sessionID) {
    const resp = await axios.post(
        `${URLCommandBase}/GetStateUIExt?${hostName}`,
        formatCommandBody(stateID, sessionID, "demand_material"),
        { headers }
    );

    //Convert XML to Json
    const json = await interpretMacroResponse(resp.data['d']);
    return json;
}

async function getSVPage(stateID, hostName) {
    //Execute Interact With Server
    const resp = await axios.post(
        `${URLInteractWithServer}?${hostName}`,
        formatCommandBody(stateID, hostName)
    );
    //Convert XML to Json
    const json = await interpretMacroResponse(resp.data['d']);
    return json;
}

async function interpretMacroResponse(data) {
    const json = await new Promise((resolve, reject) => {
        xml2js.parseString(data, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

    return json;
}

function getOrderMetadata(json) {
    return {
        stateID: json.root.$["StateID"],
        hostName: json.root.$["HostName"]
    }
}

module.exports = { retrieveSV, orderLocatorSearch };