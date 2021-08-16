"use strict";
const URLCommandBase = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/`;
const URLExecuteMacro = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/ExecMacroUIExt`;
const URLInteractWithServer = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?SkhMc20wbi9JemxhR1N1ZWhObzhHUT09X3JVRm53QTRCbHpWRVFLSWlPUkFvZGc9PQ2`;
const axios = require("axios");
const xml2js = require("xml2js");
const Database = require("../database/db");
const { parseErrorCode } = require("../helpers/errorParser");
const { AsteaError } = require("./AsteaError");
const ServiceOrder = require("./ServiceOrder");

const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json, text/javascript, */*; q=0.01",
   // "CurrentProfile": "Prod"
}

function formatExecuteMacroBody(macroName, sessionID, ...params) {
    return {
        "macroName": macroName,
        "bcName": "Service_Order",
        "boAlias": "main",
        "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>${params[0]}</value></array></xml>`,
        "sessionId": sessionID,
        "stateId": -1,
        "saveState": false,
        "closeState": false,
        "xmlRequest": "<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='service_request_maint' stateID='-1'><BO alias='main'></BO><BO alias='address_xref'></BO><BO alias='demand_labor'></BO><BO alias='demand_availability'></BO><BO alias='order_general_xref'></BO><BO alias='demand_link_xref_on_order'></BO><BO alias='access_hours'></BO><BO alias='checklist_for_order_hdr'></BO><BO alias='checklist_for_order_goods'></BO><BO alias='checklist_for_order_items'></BO><BO alias='checklist_for_order_services'></BO></GetCurrentState></root>",
        "moduleName": "service_order_maint"
    };
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

function formatSearchBody(sessionID){
    return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><RetrieveXMLExt xmlns="http://astea.services.wcf/"><sessionID>6d8f436f-4a27-4851-9b37-83ac4ce1b268Prod</sessionID><XMLCriteria>&lt;Find sort_column_alias="open_date" sort_direction="-" force_sort="true" entity_name="order_locator" query_name="order_locator_scrl" getRecordCount="true" a_fco_serv_bull_arg1="1=1" a_fco_serv_bull_arg2="1=1" a_order_type="1=1" a_c_order_type="1=1" where_cond1="( order_line.request_id like &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr like &amp;apos;%QNTech%&amp;apos; ) AND ( order_line.open_date &amp;gt;= &amp;apos;20210301 00:00:00&amp;apos; )" where_cond2="( c_order_line.request_id like &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr like &amp;apos;%QNTech%&amp;apos; ) AND ( c_order_line.open_date &amp;gt;= &amp;apos;20210301 00:00:00&amp;apos; )"&gt;&lt;operators values="=;=;=;=;=;=;" /&gt;&lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;&lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;&lt;is_translatable_alias values="N;N;N;N;N;N;" /&gt;&lt;/Find&gt;</XMLCriteria></RetrieveXMLExt></s:Body></s:Envelope>`;
}

async function retrieveSV(id, session) {
    const cached = await Database.getServiceOrder(id); //If the cached work order is less than 60 minutes old, we can use the cached version
    const sessionID = session.sessionID;

    if(cached && (Date.now() - cached.createdAt) < 60000000) {
        return { serviceOrder: cached };
    }

    const resp = await axios.post(
        URLExecuteMacro,
        formatExecuteMacroBody("retrieve", sessionID, id)
    ); //Execute Astea Macro retrieve
    
    if (resp.data.ExceptionDetail) {
        const error = await parseErrorMessage(resp.data);
        throw new AsteaError(resp.data.ExceptionDetail.Type, error?.status || 500, error?.message || `[${id}]: Astea threw an exception. \n ${resp.data.ExceptionDetail.Type}`);
    }
    const json = await interpretMacroResponse(resp.data['d']); //Convert XML response to Json\
    const { stateID, hostName } = getOrderMetadata(json); //Get state-id from the JSON
    
    const respInteractions = await getInteractions(stateID, hostName, sessionID); 
    const respMaterials = await getMaterials(stateID, hostName, sessionID);

    const serviceOrder = new ServiceOrder(json);
    serviceOrder.parseInteractions(respInteractions);
    serviceOrder.parseMaterials(respMaterials);

    Database.setServiceOrder(id, serviceOrder); //Update the cache

    return { serviceOrder, json, respInteractions };
}

async function parseErrorMessage(data){
    const messageJSON = await new Promise( (resolve, reject) => {
        xml2js.parseString(data.ExceptionDetail.Message, (err, result) => {
            if(err) {
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

module.exports = { retrieveSV };