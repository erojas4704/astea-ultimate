"use strict";

const { toActionGroupID } = require("../../backend/helpers/actionGroups");
const { decodeFromAsteaGibberish, translateFromAsteaKey, encodeToAsteaGibberish } = require("../../backend/helpers/querying");

function extractMacroFromJSON(json) {
    return json.root['GetCurrentState'][0]['$'].pageName;
}

function extractLoginDataFromJSON(json) {
    return {
        username: json["s:Envelope"]["s:Body"][0]["LoginExtendedlExt"][0].user[0],
        password: json["s:Envelope"]["s:Body"][0]["LoginExtendedlExt"][0].password[0]
    };
}

function extractSearchCriteriaFromJSON(json) {
    return json["s:Envelope"]["s:Body"][0]["RetrieveXMLExt"][0]["XMLCriteria"][0];
}

function sanitizeXMLString(xml) {
    //TODO redundant function
    return decodeFromAsteaGibberish(xml);
}

function searchResultsToAsteaGibberish(results) {
    let body =
        `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body>
                <RetrieveXMLExtResponse xmlns="http://astea.services.wcf/">
                    <RetrieveXMLExtResult>
                        ${encodeToAsteaGibberish(`
                            <root xmlns:dt="urn:schemas-microsoft-com:datatypes" totalNumRows="101" hasMore="yes" entityName="order_locator"
                            queryName="order_locator_scrl" totalRecordCount="3407" pagesCount="35" currentPage="1">
                                ${results.reduce((acc, result) => `${acc}<row status="0">${serviceOrderToXML(result)}</row>`, "")}
                            </root>
                        `)}
                    </RetrieveXMLExtResult>
                </RetrieveXMLExtResponse>
            </s:Body>
        </s:Envelope>`;
    return body;
}
//TODO include node in the order

function serviceOrderToXML(order) {
    return `
    <descr dt:dt="string">${order.problem || ""}</descr>
    <problem_desc dt:dt="string">${order.problem || ""}</problem_desc>
    <order_id dt:dt="string">${order.id || ""}</order_id>
    <request_id dt:dt="string">${order.requestID || ""}</request_id>
    <is_in_history dt:dt="string">${order.inHistory || "N"}</is_in_history>
    <node_id dt:dt="string">145</node_id>
    <open_date dt:dt="string">${order.createdAt || ""}</open_date>
    <caller_name dt:dt="string">${order.caller.name || ""}</caller_name>
    <caller_person_id dt:dt="string">${order.caller.id || ""}</caller_person_id>
    <actgr_id dt:dt="string">${toActionGroupID(order.actionGroup) || ""}</actgr_id>
    <order_stat_uniq_id dt:dt="int">${order.statusID || ""}</order_stat_uniq_id>
    <order_stat_descr dt:dt="string">${order.status || ""}</order_stat_descr>
    <serial_no dt:dt="string">${order.serialNumber || ""}</serial_no>
    <sa_person_descr dt:dt="string">${order.technician.name || ""}</sa_person_descr>
    <sa_person_id dt:dt="string">${order.technician.id || ""}</sa_person_id>
    `
}


function extractFromAsteaQuery(query) {
    const queries = {};
    query.split(/AND|OR/).forEach(element => {
        try {
            let [asteaField, value] = /[\w\. '%"]+/.exec(element.trim())[0].split(/LIKE/);
            asteaField = asteaField.trim();
            value = value.trim().match(/'%(\w*)%'/)[1];
            queries[translateFromAsteaKey(asteaField)] = value;
        } catch (e) {
            console.log(`Catchings error! Not poilte!${e} also: ${element}`);
        }
    });

    return queries;
}

module.exports = { searchResultsToAsteaGibberish, extractFromAsteaQuery, sanitizeXMLString, extractMacroFromJSON, extractLoginDataFromJSON, extractSearchCriteriaFromJSON }