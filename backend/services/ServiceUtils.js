/**
 * This file should help produce Astea JSON queries, which seem to be treated differently than XML queries.
 * These are used in Astea dialog boxes. Hopefully this will help us work faster.
 */

const { encodeToAsteaGibberish } = require("../helpers/querying");

const entities = {
    PRODUCT: "product",
    PURCHASE_REQUISTION: "portal_whse_pur_req",
    TAG: "service_order_item",
    ORDER: "order_locator"
}


const queryPairs = {
    [PRODUCT]: {
        queryName: "product_ext_lup"
    },
    [PURCHASE_REQUISTION]: {
        queryName: "get_pur_req"
    },
    [TAG]: {
        queryName: "service_item_lup"
    },
    [ORDER]: {
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

/**
 * Forms an XML body for an Astea query to retrieve information.
 * @param {Object} session - Astea session object.
 * @param {string} entity - Check under entities. Either "customer", "product", etc.
 * @param {Object} params - The parameters to pass into the query. Use "params.identifier" notation to help with readability.
 */
function asteaQuery(entity, params, pageNumber = 1, sortAscending = true) {
    if (queryPairs[entity].extraParams) {
        //Add the extra parameters to our params object
        params = {...params, ...queryPairs[entity].extraParams};
    }
    const keys = Object.keys(params);
    const sortBy = keys[0];
    const paramsQuery = keys.map(key => `${key}="${params[key]}"`).join(" ");
    const operators = keys.map(key => paramHandling[key].comparison).join(";");
    const types = keys.map(key => paramHandling[key].type).join(";");
    const isReplaceAlias = keys.map(key => "Y").join(";"); //I don't know what this does at all.

    //TODO getLookupRecordCount what is it for?
    return `
        <Find 
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
        </Find>`;
}

function xmlAsteaQuery(session, query, params, pageNumber = 1, sortAscending = true) {
    const xmlFindQuery = encodeToAsteaGibberish(asteaQuery(query, params, pageNumber, sortAscending));

    return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
        <s:Header>
            <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
        </s:Header>
        <s:Body>
            <RetrieveXMLExt xmlns="http://astea.services.wcf/">
                <sessionID>${session.sessionID}</sessionID>
                <XMLCriteria>${xmlFindQuery}</XMLCriteria>
            </RetrieveXMLExt>
        </s:Body>
    </s:Envelope>`;
}

function jsonAsteaQuery(session, query, params, pageNumber = 1, sortAscending = true) {
    const xmlFindQuery = asteaQuery(query, params, pageNumber, sortAscending);
    return {
        sessionID: session.sessionID,
        XMLCriteria: xmlFindQuery,

    }
}


module.exports = { asteaQuery, xmlAsteaQuery, jsonAsteaQuery, params, entities };