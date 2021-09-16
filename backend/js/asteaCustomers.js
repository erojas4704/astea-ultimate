"use strict";
const axios = require("axios");
const { parseXMLToJSON } = require("../helpers/xml");
const headers = require("./asteaHeaders")

require("dotenv").config();
const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;

async function customerLookup(session, criteria) {
    const { sessionID } = session;
    const resp = await axios.post(`${ASTEA_BASE_URL}/Web_Framework/DataViewMgr.svc/RetrieveXMLExt`,
        {
            "sessionID": sessionID,
            "XMLCriteria": createXMLSearchBody(criteria)
        },
        { headers }
    );
    
    const json = await parseXMLToJSON(resp.data['d']);

    return json;
}

function createXMLSearchBody(criteria) {
    if(criteria.page === undefined) 
        criteria.page = 1;

    const { name, page } = criteria;

    return `
    <Find sort_column_alias='company_id' sort_direction='+'
        force_sort='false'
        entity_name='service_cust_tree'
        query_name='service_cust_rel_new'
        pageNumber='${page}'  
        getLookupRecordCount='true' 
        descr=\"${name}\"
    >
        <operators values='like;'/>
        <types values='string;'/>
        <is_replace_alias values='Y;'/>
    </Find>    `
}

module.exports = {
    customerLookup
};