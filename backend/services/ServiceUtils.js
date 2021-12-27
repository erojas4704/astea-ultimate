/**
 * This file should help produce Astea JSON queries, which seem to be treated differently than XML queries.
 * These are used in Astea dialog boxes. Hopefully this will help us work faster.
 */

const PRODUCT = "product";

const queryPairs = {
    PRODUCT: {
        queryName: "product_ext_lup"
    }
}

const params = {
    partNumber: "bpart_id", /**The Astea part number, usually preceeded by a SP- */
    warehouseId: "a_warehouse_id",
    inventoryType: "a_inv_type_id"
}

const paramHandling = {
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
    }
}

/**
 * Forms an XML body for an Astea query to retrieve information.
 * @param {Object} session - Astea session object.
 * @param {string} query - one of "product", "customer", "order", "interaction"
 * @param {Object} params - The parameters to pass into the query. Use "params.identifier" notation to help with readability.
 */
async function asteaQuery(session, query, params, pageNumber = 1, sortAscending = true) {
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
        entity_name="${query}"
        query_name="${queryPairs[query].queryName}"
        pageNumber="${pageNumber}"
        getLookupRecordCount="true"
        ${paramsQuery}>
            <operators values="${operators}" />
            <types values="${types}" />
            <is_replace_alias values="${isReplaceAlias}" />
        </Find>`;
}

module.exports = { asteaQuery, params, PRODUCT };