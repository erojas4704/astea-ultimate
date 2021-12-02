const searchKeys = {
    "openDate": "order_line.open_date",
    "actionGroup": "actgr.descr",
    "id": "order_line.request_id",
    "name": "order_line.cust_company_descr",
    "tag": "tagno",
    "serial": "serial_no",
    "technicianName": "person.search_name",
    "technicianID": "service_call.sa_person_id",
    "inHistory": "order_line.is_in_history"
}

const secondarySearchKeys = {
    "id": "c_order_line.request_id",
    "openDate": "c_order_line.open_date",
    "name": "c_order_line.cust_company_descr",
    "technicianID": "c_service_call.sa_person_id",
    "inHistory": "c_order_line.is_in_history",
}

//TODO sometimes the search returns nothing with an @@1
function generateSearchQuery(criteria, page = 1) {
    //Generates an Astea search query
    let conditions = [];
    let secondaryConditions = []; //I don't know why astea has a secondary condition, but it does.
    let catchAll = [];
    let catchAllSecondary = [];
    let catchAllAppendix = "";
    let catchAllAppendixSecondary = "";

    criteria.inHistory = criteria.includeHistory ? "Y" : "N";
    delete criteria.includeHistory; //TODO just a quick hack to get the search working

    //TODO make an array of all the keys to look for that can be set in the environment variable.
    if (criteria['all']) {
        ["id", "name", "tag", "serial", "technicianName", "technicianID"].forEach(key => {
            const asteaKey = translateToAsteaKey(key, false);
            catchAll.push(`${asteaKey} LIKE '%${criteria['all']}%'`);
            const secondaryKey = translateToAsteaKey(key, true);
            catchAllSecondary.push(`${secondaryKey} LIKE '%${criteria['all']}%'`);
        });
        catchAllAppendix = ` AND (${catchAll.join(" OR ")})`;
        catchAllAppendixSecondary = ` AND (${catchAllSecondary.join(" OR ")})`;
    }

    for (let key in criteria) {
        if (key === "all") continue;
        //Generate a query based on that key.
        const asteaKey = translateToAsteaKey(key, false);
        conditions.push(`( ${asteaKey} LIKE '%${criteria[key]}%' )`);

        const secondaryKey = translateToAsteaKey(key, true);
        secondaryConditions.push(`( ${secondaryKey} LIKE '%${criteria[key]}%' )`);
    }
    const numQueries = conditions.length + secondaryConditions.length;

    let query = `
        <Find sort_column_alias="open_date" sort_direction="-" force_sort="true" entity_name="order_locator" query_name="order_locator_scrl" getRecordCount="true"
        a_fco_serv_bull_arg1="1=1" a_fco_serv_bull_arg2="1=1" a_order_type="1=1" a_c_order_type="1=1" pageNumber="${page}"
        where_cond1="${conditions.join(" AND ")} ${catchAllAppendix}"
        where_cond2="${secondaryConditions.join(" AND ")} ${catchAllAppendixSecondary}">
            <operators values="${"=;".repeat(6)}" />
            <types values="${"argument;".repeat(6)}" />
            <is_replace_alias values="${"Y;".repeat(6)}" />
            <is_translatable_alias values="${"N;N;N;N;Y;Y;"}" />
        </Find>
    `;

    return encodeToAsteaGibberish(query);
}

function translateToAsteaKey(key, useSecondary) {
    if (useSecondary && secondarySearchKeys[key]) {
        return secondarySearchKeys[key];
    }

    if (!searchKeys[key]) throw new Error(`Could not find Astea search key for '${key}'`);

    return searchKeys[key];
}

function translateFromAsteaKey(key) {
    for (let searchKey in searchKeys) {
        if (searchKeys[searchKey] === key)
            return searchKey;
    }

    throw new Error(`Could not convert ${key} into one of our search keys.`);
}


function encodeToAsteaGibberish(string) {
    //&#xD; Carriage return
    string = string.replace(/&/g, "&amp;amp;");       //Replace &
    string = string.replace(/'/g, "&apos;");     //Replace single quotes with Astea's XML-safe version
    string = string.replace(/</g, "&lt;");       //Replace <
    string = string.replace(/>/g, "&gt;");       //Replace >
    string = string.replace(/\n/g, "\n");        //Remove redundant newlines
    string = string.replace(/\s+/g, " ");        //Remove redundant whitespace
    return string;
}

function decodeFromAsteaGibberish(string) {
    string = string.replace(/&amp;amp;/g, "&");       //Replace Astea's XML-safe version of & with &
    string = string.replace(/&apos;/g, "'");      //Replace Astea's XML-safe version of single quotes with a single quote
    string = string.replace(/&lt;/g, "<");        //Replace Astea's XML-safe version of <
    string = string.replace(/&gt;/g, ">");        //Replace Astea's XML-safe version of >
    string = string.replace(/\n/g, "\n");         //Replace Astea's XML-safe version of newlines
    string = string.replace(/\s+/g, " ");         //Replace Astea's XML-safe version of whitespace
    return string;
}

module.exports = { translateToAsteaKey, translateFromAsteaKey, generateSearchQuery, encodeToAsteaGibberish, decodeFromAsteaGibberish };