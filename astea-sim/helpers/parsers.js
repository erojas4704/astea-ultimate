"use strict";

const { decodeFromAsteaGibberish, translateFromAsteaKey } = require("../../backend/helpers/querying");

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
    return decodeFromAsteaGibberish(xml)
}

function extractFromAsteaQuery(query) {
    const queries = {};
    console.log(query);
    query.split(" AND ").forEach(element => {
        let [asteaField, value] = element.match(/\((.*)\)/)[1].split(/LIKE|OR/);
        console.log(asteaField);
        asteaField = asteaField.trim();
        value = value.trim().match(/'%(\w*)%'/)[1];
        queries[translateFromAsteaKey(asteaField)] = value;
    });
    
    console.log(queries);

    return queries;
}

module.exports = { extractFromAsteaQuery, sanitizeXMLString, extractMacroFromJSON, extractLoginDataFromJSON, extractSearchCriteriaFromJSON }