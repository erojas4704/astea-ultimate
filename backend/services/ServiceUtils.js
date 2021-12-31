/**
 * This file should help produce Astea JSON queries, which seem to be treated differently than XML queries.
 * These are used in Astea dialog boxes. Hopefully this will help us work faster.
 */

const { encodeToAsteaGibberish } = require("../helpers/querying");

const entities = {
    MATERIAL: "product",
    PURCHASE_REQUISTION: "portal_whse_pur_req",
    TAG: "service_order_item",
    ORDER: "order_locator"
}


const queryPairs = {
    [entities.MATERIAL]: {
        queryName: "product_ext_lup"
    },
    [entities.PURCHASE_REQUISTION]: {
        queryName: "get_pur_req"
    },
    [entities.TAG]: {
        queryName: "service_item_lup"
    },
    [entities.ORDER]: {
        queryName: "order_locator_scrl",
        extraParams: {
            "a_fco_serv_bull_arg1": "1=1",
            "a_fco_serv_bull_arg2": "1=1",
            "a_order_type": "1=1",
            "a_c_order_type": "1=1"
        }
    }
}

const params = {
    partNumber: "bpart_id", /**The Astea part number, usually preceeded by a SP- */
    warehouseId: "a_warehouse_id",
    inventoryType: "a_inv_type_id",

    purchaseReqId: "poh_id",
    toWarehouseId: "to_warehouse_id",

    tag: "tagno",
    //Special case, order conditions will be parsed differently
    criteria: "where_cond1"
}

const paramHandling = {
    //Materials
    [params.partNumber]: {
        comparison: "like",
        type: "string"
    },
    [params.warehouseId]: {
        comparison: "=",
        type: "argument"
    },
    [params.inventoryType]: {
        comparison: "=",
        type: "argument"
    },

    //Purchase Requisition
    [params.purchaseReqId]: {
        comparison: "like",
        type: "string"
    },
    [params.toWarehouseId]: {
        comparison: "like",
        type: "string"
    },

    //Tags
    [params.tag]: {
        comparison: "like",
        type: "string"
    }
}

const states = {
    "interactions": "customer_authorization",
    "materials": "demand_materials",
    "expenses": "demand_expenses"
}

/**
 * Forms an XML body for an Astea query to retrieve information.
 * @param {Object} session - Astea session object.
 * @param {string} entity - Check under entities. Either "customer", "product", etc.
 * @param {Object} searchParams - The parameters to pass into the query. Use "params.identifier" notation to help with readability.
 */
function asteaQuery(entity, searchParams, pageNumber = 1, sortAscending = true) {
    searchParams = convertToAsteaParams(searchParams); //Convert to Astea-friendly params if they're not already
    if (queryPairs[entity].extraParams) {
        //Add the extra parameters to our params object
        searchParams = { ...searchParams, ...queryPairs[entity].extraParams };
    }
    const keys = Object.keys(searchParams);
    const sortBy = keys[0];
    const paramsQuery = keys.map(key => `${key}="${searchParams[key]}"`).join(" ");
    console.log(keys);
    const operators = keys.map(key => paramHandling[key].comparison).join(";");
    const types = keys.map(key => paramHandling[key].type).join(";");
    const isReplaceAlias = keys.map(key => "Y").join(";"); //I don't know what this does at all.

    //TODO getLookupRecordCount what is it for?
    const xml =
        `<Find 
            sort_column_alias="${sortBy}"
            sort_direction="${sortAscending ? '+' : '-'}"
            force_sort="false"
            entity_name="${entity}"
            query_name="${queryPairs[entity].queryName}"
            pageNumber="${pageNumber}"
            getLookupRecordCount="true"
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
 * @param {string} pageName - The name of the page we're getting data from. Orders fall under "service_request_maint".
 * @param {Array} requestedData - The data we're requesting. Look at the States enum for potential data to request. [states.interactions, states.materials, etc].
 */
function getOrderStateBody(stateId, pageName, requestedData) {
    const strData = requestedData.map(data => `<BO alias="${data}"></BO>`).join("");
    const XML = `
        <root>
            <GetCurrentState>
            ${strData}
            </GetCurrentState>
        </root>
    `
}

function convertToAsteaParams(searchParams) {
    const convertedParams = {};
    for (const key in searchParams) {
        if (params.hasOwnProperty(key)) {
            const value = searchParams[key];
            convertedParams[params[key]] = value;
        } else {
            convertedParams[key] = value;
        }
    }
    return convertedParams;
}

function xmlAsteaQuery(session, entity, params, pageNumber = 1, sortAscending = true) {
    const xmlFindQuery = encodeToAsteaGibberish(asteaQuery(entity, params, pageNumber, sortAscending));
    return xmlFindQuery;
}

function jsonAsteaQuery(session, entity, params, pageNumber = 1, sortAscending = true) {
    const xmlFindQuery = asteaQuery(entity, params, pageNumber, sortAscending);
    return {
        sessionID: session.sessionID,
        XMLCriteria: xmlFindQuery,

    }
}

function sanitizeXML(xml) {
    return xml.replace(/\n/g, "");
}


module.exports = { asteaQuery, xmlAsteaQuery, jsonAsteaQuery, params, entities, getOrderStateBody, states };