const Definitions = require("../astea/Definitions");
const moment = require("moment");
/**
 * This file should help produce Astea JSON queries, which seem to be treated differently than XML queries.
 * These are used in Astea dialog boxes. Hopefully this will help us work faster.
 */

const { encodeToAsteaGibberish, decodeFromAsteaGibberish, processAllKey } = require("../helpers/querying");
const { parseXMLToJSON } = require("../helpers/xml");

const entities = {
    MATERIAL: "product",
    PURCHASE_REQUISTION: "portal_whse_pur_req",
    TAG: "service_order_item",
    ORDER: "order_locator"
}


const queryPairs = {
    [entities.MATERIAL]: {
        queryName: "product_ext_lup",
        metaParams: {
            getLookupRecordCount: "true"
        }
    },
    [entities.PURCHASE_REQUISTION]: {
        queryName: "get_pur_req",
        metaParams: {
            getLookupRecordCount: "true"
        }
    },
    [entities.TAG]: {
        queryName: "service_item_lup",
        metaParams: {
            getLookupRecordCount: "true"
        }
    },

    [entities.ORDER]: {
        queryName: "order_locator_scrl",
        extraParams: {
            "a_fco_serv_bull_arg1": "1=1",
            "a_fco_serv_bull_arg2": "1=1",
            "a_order_type": "1=1",
            "a_c_order_type": "1=1",
        },
        metaParams: {
            "getRecordCount": "true"
        }
    },
}

const params = {
    id: "bpart_id", /**The Astea part number, usually preceeded by a SP- */
    warehouseId: "a_warehouse_id",
    inventoryType: "a_inv_type_id",

    purchaseReqId: "poh_id",
    toWarehouseId: "to_warehouse_id",

    tag: "tagno",
    //TODO just remove this?
    //Special case, order conditions will be parsed differently
    criteria: "criteria"
}

const paramHandling = {
    //Materials
    [params.id]: {
        comparison: "like",
        type: "string",
        replaceAlias: 'Y'
    },
    [params.warehouseId]: {
        comparison: "=",
        type: "argument",
        replaceAlias: 'Y'
    },
    [params.inventoryType]: {
        comparison: "=",
        type: "argument",
        replaceAlias: 'Y'
    },

    //Purchase Requisition
    [params.purchaseReqId]: {
        comparison: "like",
        type: "string",
        replaceAlias: 'Y'
    },
    [params.toWarehouseId]: {
        comparison: "like",
        type: "string",
        replaceAlias: 'Y'
    },

    //Tags
    [params.tag]: {
        comparison: "like",
        type: "string",
        replaceAlias: 'Y'
    },

    //Special case, criteria
    //Can have keys, but if there's no key, the callback should return a key.
    //If the callback is an array, we'll execute every method in that callback to generate multiple xml queries.
    [params.criteria]: {
        callback: [extractAsteaQuery, extractSecondaryAsteaQuery],
        comparison: "=;=", //TODO nasty hack. make it generate dynamically.
        type: "argument;argument",
        replaceAlias: "N;N"
    },
}

const serviceModules = {
    serviceOrder: {
        bcName: "Service_Order",
        moduleName: "service_order_maint",
        pageName: "service_request_maint"
    }
}

const states = {
    "interactions": "customer_authorization",
    "materials": "demand_material",
    "expenses": "demand_expense"
}

/**
 * 
 * @param {function|string} entity 
 * @param {*} params 
 * @param {*} keys 
 * @returns 
 */
function processParam(searchParams, key) {
    const param = searchParams[key];

    switch (typeof param) {
        case "string":
            return `${key}="${param}"`
        case "object":
            const processor = paramHandling[key];
            if (processor) {
                if (typeof processor.callback === "function") {
                    const value = processor ? processor.callback(param) : param;
                    const prefix = param.key ? `${param.key}=` : "";
                    return `${prefix}${value}`;
                } else if (Array.isArray(processor.callback)) {
                    return processor.callback.map(callback => callback(param)).join(" ");
                }
            }
            return `${key}="${param}"`;
    }
    throw new Error(`Invalid entity type Key: ${key} Type: ${typeof param} Value: ${JSON.stringify(param)}`);
}

//TODO unit test this function

/**
 * Forms an XML body for an Astea query to retrieve information.
 * @param {Object} session - Astea session object.
 * @param {string} entity - Check under entities. Either "customer", "product", etc.
 * @param {Object} searchParams - The parameters to pass into the query. Use "params.identifier" notation to help with readability.
 */
function asteaQuery(entity, searchParams, pageNumber = 1, sortAscending = true, forceSort = false, sortBy = undefined) {
    searchParams = convertToAsteaParams(searchParams); //Convert to Astea-friendly params if they're not already
    const defaultSortKey = Object.keys(searchParams)[0]; //HACK
    if (queryPairs[entity].extraParams) {
        //Add the extra parameters to our params object
        searchParams = { ...queryPairs[entity].extraParams, ...searchParams };
    }
    const keys = Object.keys(searchParams);
    if (!sortBy) sortBy = defaultSortKey;
    const paramsQuery = keys.map(key => processParam(searchParams, key)).join(" ");

    const operators = keys.map(key => `${paramHandling[key]?.comparison || '='};`).join("");
    const types = keys.map(key => `${paramHandling[key]?.type || 'argument'};`).join("");
    const isReplaceAlias = keys.map(key => `${paramHandling[key]?.replaceAlias || 'Y'};`).join(""); //I don't know what this isReplaceAlias tag does at all.
    const metaParams = queryPairs[entity].metaParams ?
        Object.keys(queryPairs[entity].metaParams).map(key => `${key}="${queryPairs[entity].metaParams[key]}"`).join(" ") :
        "";
    //TODO getLookupRecordCount what is it for?
    const xml =
        `<Find 
            sort_column_alias="${sortBy}"
            sort_direction="${sortAscending ? '+' : '-'}"
            force_sort="${forceSort}"
            entity_name="${entity}"
            query_name="${queryPairs[entity].queryName}"
            ${pageNumber > 1 ? pageNumber = `pageNumber="${pageNumber}"` : ""}
            ${metaParams}
        ${paramsQuery}>
                <operators values="${operators}" />
                <types values="${types}" />
                <is_replace_alias values="${isReplaceAlias}" />
        </Find>`
    return sanitizeXML(xml);
}

/**
 * Creates a query that gets specific order details from Astea, known as "states". This can be used 
 * to retrieve specific order data, such as interactions, materials, and demands.
 * @param {string} stateId - The state ID of the order. This is needed for order queries to work.
 * @param {string} sessionId - Session ID of the user.
 * @param {string} pageName - The name of the page we're getting data from. Orders fall under "service_request_maint".
 * @param {Object} serviceModule - The name of the module, best retrieved from ServiceUtils.serviceModules.
 * @param {Array} dataToRequest - The data we're requesting. Look at the States enum for potential data to request. [states.interactions, states.materials, etc].
 */
function getOrderStateBody(stateId, sessionId, serviceModule, dataToRequest) {
    if (typeof dataToRequest === "string") dataToRequest = [dataToRequest];

    const strData = dataToRequest.map(data => `<BO alias='${data}'></BO>`).join("");
    const xmlRequest = `
        <root>
            <GetCurrentState pageName='${serviceModule.pageName}' stateID='${stateId}'>
            ${strData}
            </GetCurrentState>
        </root>
    `;

    return {
        stateId,
        sessionId,
        bcName: serviceModule.bcName,
        moduleName: serviceModule.moduleName,
        xmlRequest: xmlRequest.replace(/\s+/g, " ").replace(/\n/g, "")
    }
}

/**
 * Converts our, friendlier and more legible parameters to Astea-friendly parameters.
 * @param {Object} searchParams Object whose keys are the parameters we want to convert.
 * @returns The Astea-friendly version of the parameters.
 */
function convertToAsteaParams(searchParams) {
    const convertedParams = {};
    for (const key in searchParams) {
        const value = searchParams[key];
        if (params.hasOwnProperty(key)) {
            convertedParams[params[key]] = value;
        } else {
            convertedParams[key] = value;
        }
    }
    return convertedParams;
}


const macros = {
    ORDER: "",
    PRODUCT: ""
}
/**
 * 
 * @param {String} macroName The name of the macro being invoked, 
 * @param {String} sessionID 
 * @param {Object} conditions 
 * @param {Array} params 
 */
function createMacro(macro, sessionID, conditions, params){

}

function xmlAsteaQuery(session, entity, params, pageNumber = 1, sortAscending = true, forceSort = false, sortBy = undefined) {
    const xmlFindQuery = encodeToAsteaGibberish(asteaQuery(entity, params, pageNumber, sortAscending, forceSort, sortBy));
    return `
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Header>
                <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
            </s:Header>
            <s:Body>
            <RetrieveXMLExt xmlns="http://astea.services.wcf/">
                <sessionID>${session.sessionID}</sessionID>
                <XMLCriteria>${xmlFindQuery}</XMLCriteria>
            </RetrieveXMLExt>
            </s:Body>
        </s:Envelope>
    `;
}

function jsonAsteaQuery(session, entity, params, pageNumber = 1, sortAscending = true, forceSort = false, sortBy = undefined) {
    const xmlFindQuery = asteaQuery(entity, params, pageNumber, sortAscending, forceSort, sortBy);
    return {
        sessionID: session.sessionID,
        XMLCriteria: xmlFindQuery,

    }
}

function isEnoughSpecifity(criteria){
    if(criteria.inHistory && criteria.inHistory === "N") return true;
    if(criteria.openDateFrom) return true;
    if(criteria.id && criteria.id.length > 4) return true;
    if(criteria.name && criteria.name.length > 4) return true;
    return false;
}

function extractAsteaQuery(criteria, useSecondary = false, conditionLabel = "where_cond1") {
    //Go through all the fields in criteria.
    //Translate the key to the Astea key.
    //Join them by AND conditions and surround them in % symbols. Match them by LIKE.
    if (criteria["all"]) criteria = { ...processAllKey(criteria["all"]), ...criteria };

    //If we do not have enough specificity, we'll narrow down our search to only orders from the last 120 days.
    if(!isEnoughSpecifity(criteria))
        criteria.openDateFrom = moment().subtract(120, "days").format("YYYY-MM-DD");
    
    //TODO extractAsteaQuery(all, joinWith="OR");
    delete criteria["all"];

    const keys = Object.keys(criteria);
    const queryArr = keys.map(key => {
        const value = (criteriaParsers[key] && criteriaParsers[key](criteria[key])) || criteria[key];
        const asteaKey = Definitions.translateToAsteaKey(key, useSecondary);
        const comparator = criteriaComparators[key] || "LIKE";
        const prefixSuffix = comparator === "LIKE" ? "%" : "";
        return `( ${asteaKey} ${comparator} '${prefixSuffix}${value}${prefixSuffix}' )`;
    });

    return `${conditionLabel}=" ${queryArr.join(" AND ")} "`;
}

const criteriaComparators = {
    "openDateFrom": ">=",
    "openDateTo": "<="
}

const criteriaParsers = {
    "openDateFrom": date => `${new Date(date).toISOString().split("T")[0].replace(/-/g, "")} 00:00:00`,
    "openDateTo": date => `${new Date(date).toISOString().split("T")[0].replace(/-/g, "")} 23:59:59`,
    "openDate": date => `${new Date(date).toISOString().split("T")[0].replace(/-/g, "")} 00:00:00`
}

function extractSecondaryAsteaQuery(criteria) {
    return extractAsteaQuery(criteria, true, "where_cond2");
}

function sanitizeXML(xml) {
    return xml.replace(/\n/g, "");
}


module.exports = { asteaQuery, xmlAsteaQuery, jsonAsteaQuery, params, entities, getOrderStateBody, states, serviceModules, createMacro };