
function generateSearchQuery(criteria) {
    //Generates an Astea search query
    let conditions = [];
    let secondaryConditions = []; //I don't know why astea has a secondary condition, but it does.
    for (let key in criteria) {
        //Generate a query based on that key.
        const asteaKey = translateToAsteaKey(key, false);
        conditions.push(`( ${asteaKey} LIKE '%${criteria[key]}%' )`);

        const secondaryKey = translateToAsteaKey(key, true);
        secondaryConditions.push(`( ${secondaryKey} LIKE '%${criteria[key]}%' )`);
    }
    const numQueries = conditions.length + secondaryConditions.length;

    let query = `
        <Find sort_column_alias="open_date" sort_direction="-" force_sort="true" entity_name="order_locator" query_name="order_locator_scrl" getRecordCount="true"
        a_fco_serv_bull_arg1="1=1" a_fco_serv_bull_arg2="1=1" a_order_type="1=1" a_c_order_type="1=1"
        where_cond1="${conditions.join(" AND ")}"
        where_cond2="${secondaryConditions.join(" AND ")}">
            <operators values="${"=;".repeat(6)}" />
            <types values="${"argument;".repeat(6)}" />
            <is_replace_alias values="${"Y;".repeat(6)}" />
            <is_translatable_alias values="${"N;N;N;N;Y;Y;"}" />
        </Find>
    `;

    return encodeToAsteaGibberish(query);
}

function translateToAsteaKey(key, useSecondary) {
    const keys = {
        "openDate": "order_line.open_date",
        "actionGroup": "actgr.descr",
        "id": "order_line.request_id",
        "name": "order_line.cust_company_descr"
    }

    const secondary = {
        "id": "c_order_line.request_id",
        "openDate": "c_order_line.open_date",
        "name": "c_order_line.cust_company_descr"
    }

    if (useSecondary && secondary[key]) {
        return secondary[key];
    }

    if(!keys[key]) throw new Error(`Could not find Astea search key for '${key}'`);

    return keys[key];
}


function encodeToAsteaGibberish(string){
    string = string.replace(/'/g, "&apos;");     //Replace single quotes with Astea's XML-safe version
    string = string.replace(/</g, "&lt;");       //Replace <
    string = string.replace(/>/g, "&gt;");       //Replace >
    string = string.replace(/\n/g, "\n");          //Remove redundant newlines
    string = string.replace(/\s+/g, " ");         //Remove redundant whitespace
    return string;
}

function decodeFromAsteaGibberish(string){
    string = string.replace(/&apos;/g, "'");     //Replace Astea's XML-safe version of single quotes with a single quote
    string = string.replace(/&lt;/g, "<");       //Replace Astea's XML-safe version of <
    string = string.replace(/&gt;/g, ">");       //Replace Astea's XML-safe version of >
    string = string.replace(/\n/g, "\n");          //Replace Astea's XML-safe version of newlines
    string = string.replace(/\s+/g, " ");         //Replace Astea's XML-safe version of whitespace
    return string;
}

module.exports = { translateToAsteaKey, generateSearchQuery, encodeToAsteaGibberish, decodeFromAsteaGibberish };