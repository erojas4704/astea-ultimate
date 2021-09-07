"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { retrieveSV, orderLocatorSearch, getInteractions, getMaterials } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
const { parseXMLToJSON } = require("../helpers/xml.js");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get("/raw", async (req, res, next) => {
    const { id } = req.query;
    try {
        const sv = await retrieveSV(id, false, req.session);
        return res.send(sv.json);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/", async (req, res, next) => {
    const { id, history } = req.query;
    try {
        const sv = await retrieveSV(id, history === "y", req.session);
        return res.send(sv.serviceOrder);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});


async function doDumbCalls(sessionID, stateID, hostName, headers, id) {
    const URLInteractWithServer = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`;
    const URLRetrieveXML = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/DataViewMgr.svc/RetrieveXMLExt`;
    const URLExecMacro = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/ExecMacroUIExt`;
    const host = `https://alliance.microcenter.com/`;


    console.log("Doing dumb call -1...");

    const _neg1st = await axios.post(`${host}/AsteaAlliance110/Web_Framework/DataViewMgr.svc/dotnet`,
        `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><GetDescrExt xmlns="http://astea.services.wcf/"><entityName>service_order</entityName><sessionID>${sessionID}</sessionID><keyValue i:type="a:string" xmlns:a="http://www.w3.org/2001/XMLSchema" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">${id}</keyValue><elementName>itil_type</elementName></GetDescrExt></s:Body></s:Envelope>`,
        { headers }
    );


    console.log("Doing idiotic get request...");

    const idiotGetRequest = await axios.get(`${host}/AsteaAlliance110/form_asp/service_request_maint.shtml`,
        { headers }
    );

    console.log("Doing dumb call 0...");

    const _0th = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/CloseUIExt?${hostName}`,
        { "stateId": stateID, "sessionId": sessionID, "bcName": "Service_Order", "moduleName": "service_order_maint" },
        { headers }
    );

    console.log("Doing dumb call 1...");

    const _1st = await axios.post(URLExecMacro,
        { "macroName": "retrieve", "bcName": "Service_Order", "boAlias": "main", "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>${id}</value></array></xml>`, "sessionId": sessionID, "stateId": -1, "saveState": false, "closeState": false, "xmlRequest": "<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='service_request_maint' stateID='-1'><BO alias='main'></BO><BO alias='address_xref'></BO><BO alias='demand_labor'></BO><BO alias='demand_availability'></BO><BO alias='order_general_xref'></BO><BO alias='demand_link_xref_on_order'></BO><BO alias='access_hours'></BO><BO alias='checklist_for_order_hdr'></BO><BO alias='checklist_for_order_goods'></BO><BO alias='checklist_for_order_items'></BO><BO alias='checklist_for_order_services'></BO></GetCurrentState></root>", "moduleName": "service_order_maint" },
        { headers }
    );

    const _1stJSON = await parseXMLToJSON(_1st.data['d']);
    hostName = _1stJSON.root.$.HostName;
    stateID = _1stJSON.root.$.StateID;

    console.log("Doing dumb call 2...");

    const _2nd = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/NetSpeller/SpellerService.svc/LoadDictionary`,
        { "lang_id": "ENG" },
        { headers }
    );

    console.log("Doing dumb call 3...");

    const _3rd = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/DataViewMgr.svc/GetDescrExExt`,
        { "entityName": "glb_param", "sessionID": sessionID, "keyName": "ap_glb_param_code", "keyValue": "glb_find_sa_by_territory", "elementName": "ap_glb_param_val" },
        { headers }
    );

    console.log("Doing dumb call 4...");

    const _4th = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/Settings.svc/GetData2Ext`,
        { "setting": "GIS/ProviderURL", "sessionID": sessionID },
        { headers }
    );

    console.log("Doing dumb call 5...");

    const _5th = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/CacheEngine.svc/GetSelectedCacheXMLExt`,
        { "fileName": "AST_report", "bDistinct": true, "selectFields": "qbe_asp_name", "tableAlias": "a2_report", "whereCond": "report_name='Invoice_Service_Report'", "sSort": "", "bAsteaFormat": true, "sessionID": sessionID },
        { headers }
    );

    console.log("Doing dumb call 6...");

    const _6th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/Permissions.svc/GetPermissionsXMLExt`,
        { "pageName": "reports_qbe_asp/invoice_service_report_qbe.shtml", "BCName": "Reprint_invoice", "sessionID": sessionID },
        { headers }
    );


    console.log("Doing dumb call 7...");

    const _7th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/DataViewMgr.svc/RetrieveXMLExt`,
        { "sessionID": sessionID, "XMLCriteria": "<Find entity_name='priority_class' query_name='priority_class_lup'><types values=''/><operators values=''/></Find>" },
        { headers }
    );

    console.log("Doing dumb call 8...");

    const _8th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/DataViewMgr.svc/RetrieveXMLBatchNoLimitExt`,
        { "sessionID": sessionID, "XMLCriteria": "<FindBatch><Find entity_name='order_stat' query_name='service_order_stat_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='activity' query_name='mngt_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='project_status' query_name='psa_status_for_dynamic_ddlb'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='general_codes' query_name='get_entitle_values'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='order_activity' query_name='order_activity_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='severity' query_name='severity_with_empty_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='ans_list_lines' query_name='ans_list_lines_scrl'  getRecordCount='false' where_cond=\"1&lt;&gt;1\" ><operators values='=;'/><types values='argument;'/><is_replace_alias values='Y;'/></Find><Find entity_name='general_codes' query_name='num_format_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='urgency_codes' query_name='urgency_codes_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='impact_codes' query_name='impact_codes_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='kpi' query_name='kpi_colors'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='kpi_dimension' query_name='kpi_dimension_state'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='tzone_utc' query_name='tzone_utc_scrl'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find></FindBatch>" },
        { headers }
    );

    console.log("Doing dumb call 9...");

    const _9th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/DataViewMgr.svc/CanFindExExt`,
        { "entityName": "conf_viewer_header", "sessionID": sessionID, "keyName": "cust_id", "keyValue": "CUST1310101752" }, //LOOK at the cust id
        { headers }
    );

    console.log("Doing dumb call 10...");

    const _10th = await axios.post(URLRetrieveXML,
        { "sessionID": sessionID, "XMLCriteria": "<Find entity_name='company' query_name='vendor_product_info'  getRecordCount='true' a_bpart_id_arg=\"635493\" ><operators values='=;'/><types values='argument;'/><is_replace_alias values='Y;'/></Find>" },
        { headers }
    );

    console.log("Doing dumb call 11...");

    const _11th = await axios.post(URLRetrieveXML,
        { "sessionID": sessionID, "XMLCriteria": "<Find entity_name='glb_param' query_name='get_glbparam_module'  getRecordCount='true' a_code=\"glb_allow_direct_link\" a_module=\"vendor_contract_setup\" ><operators values='=;=;'/><types values='argument;argument;'/><is_replace_alias values='Y;Y;'/></Find>" },
        { headers }
    );

    console.log("Doing dumb call 12...");

    const _12th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/Permissions.svc/GetPermissionsXMLExt`,
        { "pageName": "attachments/ao_attachfile.shtml", "BCName": "ap_attachments", "sessionID": sessionID },
        { headers }
    );

    console.log("Doing dumb call 13...");

    const _13th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/CacheEngine.svc/GetSelectedCacheXMLExt`,
        { "fileName": "AST_report", "bDistinct": true, "selectFields": "qbe_asp_name", "tableAlias": "a2_report", "whereCond": "report_name='FX_Service_Order_Report'", "sSort": "", "bAsteaFormat": true, "sessionID": sessionID },
        { headers }
    );

    console.log("Doing dumb call 14...");

    const _14th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/Permissions.svc/GetPermissionsXMLExt`,
        { "pageName": "reports_qbe_asp/service_order_report_qbe.shtml", "BCName": "Service_Order", "sessionID": sessionID },
        { headers }
    );

    console.log("Doing dumb call 15...");

    const _15th = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
        { "stateId": stateID, "sessionId": sessionID, "macroName": "", "bcName": "Service_Order", "boAlias": "", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"0\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_is_apply status=\"8\">Modified</cc_is_apply></row></main></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='main'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
        { headers }
    );

    //debugger;
    console.log("Dumb calls done");

    const _16th = await axios.post(`${host}/AsteaAlliance110/Web_Framework/BCBase.svc/GetStateUIExt?${hostName}`,
        { "stateId": stateID, "sessionId": sessionID, "bcName": "Service_Order", "xmlRequest": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='service_request_maint' stateID='${stateID}'><BO alias='customer_authorization'></BO></GetCurrentState></root>`, "moduleName": "service_order_maint" },
        { headers }
    );

    return { hostName, stateID };
}

router.post("/interactions3", async (req, res, next) => {
    const { id, message } = req.body;
    try {
        const svResp = await retrieveSV(id, false, req.session, true);
        const sv = svResp.serviceOrder;
        const { stateID, hostName } = sv.metadata;
        const sessionID = req.session.sessionID;
        const headers = {
        }

        const createBlankInteractionResp = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            {
                "stateId": stateID,
                "sessionId": sessionID,
                "macroName": "new",
                "bcName": "Service_Order",
                "boAlias": "customer_authorization",
                "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>",
                "updateStateXml": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>",
                "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='customer_authorization'></BO></GetCurrentState></root>`,
                "requestStateXPathFilter": "//customer_authorization/row[last()]",
                "saveState": false,
                "closeState": false,
                "moduleName": "service_order_maint"
            },
            { headers }
        );


        const createBlankInteractionRespJSON = await parseXMLToJSON(createBlankInteractionResp.data['d']);

        console.log("INTERACTION ", createBlankInteractionRespJSON);
        const totalRows = createBlankInteractionRespJSON.root.customer_authorization[0].$.totalRows;
        const rowNumber = createBlankInteractionRespJSON.root.customer_authorization[0].row[0].$.number;

        return res.send(`${createBlankInteractionRespJSON.root.customer_authorization[0].row[0].descr[0]._} row number: ${rowNumber}`);

    } catch (err) {
        return next(err);
    }
});

router.get("/tojson", async (req, res, next) => {
    const json = await parseXMLToJSON(req.body.d);
    res.json(json);
});

router.post("/interactions2", async (req, res, next) => {
    const { id, message } = req.body;
    try {
        const svResp = await retrieveSV(id, false, req.session, true);
        const sv = svResp.serviceOrder;
        let { stateID, hostName } = sv.metadata;
        const URLInteractWithServer = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`;
        const URLRetrieveXML = `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/DataViewMgr.svc/RetrieveXMLExt`;
        const sessionID = req.session.sessionID;

        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Connection": "Keep-Alive",
            "Cache-Control": "no-cache",
            "Cookie": `ComputerID_Prod__erojas1=${sessionID}; ASPSESSIONIDCADCSBAT=JEKALPMAEEEIFIFCMAHLOKKE`
        };


        const okkk = await doDumbCalls(sessionID, stateID, hostName, headers, id);
        stateID = okkk.stateID;
        hostName = okkk.hostName;

        // const unnamedPrelimMacroResp = await axios.post(URLInteractWithServer,
        //     { "stateId": stateID, "sessionId": sessionID, "macroName": "", "bcName": "Service_Order", "boAlias": "", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"0\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_is_apply status=\"8\">Modified</cc_is_apply></row></main></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='main'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
        //     { headers }
        // )

        const getStateUIForInteractions = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/GetStateUIExt?${hostName}`,
            { "stateId": stateID, "sessionId": sessionID, "bcName": "Service_Order", "xmlRequest": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='service_request_maint' stateID='${stateID}'><BO alias='customer_authorization'></BO></GetCurrentState></root>`, "moduleName": "service_order_maint" },
            { headers }
        );

        const createBlankInteractionResp = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            {
                "stateId": stateID,
                "sessionId": sessionID,
                "macroName": "new",
                "bcName": "Service_Order",
                "boAlias": "customer_authorization",
                "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>",
                "updateStateXml": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>",
                "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='customer_authorization'></BO></GetCurrentState></root>`,
                "requestStateXPathFilter": "//customer_authorization/row[last()]",
                "saveState": false,
                "closeState": false,
                "moduleName": "service_order_maint"
            },

            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    //"Accept": "application/json, text/javascript, */*; q=0.01",
                    "CurrentProfile": "Prod",
                    "X-Requested-With": "XMLHttpRequest",
                    "Referer": "https://alliance.microcenter.com/AsteaAlliance110/form_asp/service_request_maint.shtml",
                    // "Accept-Language": "en-us",
                    // "Accept-Encoding": "gzip, deflate",
                    // "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)",
                    // "Host": "alliance.microcenter.com",
                    "Connection": " Keep-Alive",
                    "Cache-Control": "no-cache",
                    //"Cookie": "ComputerID_Prod__erojas1=c9ec33fc-d9b8-423a-a222-047938dc0d63Prod; ASPSESSIONIDACTTBQAD=IBDGAGMBANDJHOBAJBLLDPLN"
                }
            }
        );//Headers seem to have no bearing on what kind of response I get. It's creating blank customer authorization records, but not interactions.

        const createBlankInteractionRespJSON = await parseXMLToJSON(createBlankInteractionResp.data['d']);
        console.log("INTERACTION ", createBlankInteractionRespJSON);
        const totalRows = createBlankInteractionRespJSON.root.customer_authorization[0].$.totalRows;
        const rowNumber = createBlankInteractionRespJSON.root.customer_authorization[0].row[0].$.number;

        console.log(createBlankInteractionResp.data);
        //debugger;

        return res.send(`${createBlankInteractionRespJSON.root.customer_authorization[0].row[0].descr[0]._} row number: ${rowNumber}`);

        const hitApplyRetrieveXML = await axios.post(URLRetrieveXML,
            { "sessionID": sessionID, "XMLCriteria": "<Find entity_name='glb_param' query_name='contact_center_getglbparams'  getRecordCount='true' ap_module_name=\"service_order\" ><operators values='=;'/><types values='string;'/><is_replace_alias values='Y;'/></Find>" },
            { headers }
        );

        const retrieveAsAppendWithParams = await axios.post(URLInteractWithServer,
            { "stateId": stateID, "sessionId": sessionID, "macroName": "RETRIEVEASAPPENDWITHPARAMS", "bcName": "Service_Order", "boAlias": "checklist_for_order_hdr", "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><array><value dt:dt='string'>table_name</value><value dt:dt='string'>table_key</value></array><array><value dt:dt='string'>order</value><value dt:dt='string'>${id}</value></array><array><value dt:dt='string'>a_table_name</value><value dt:dt='string'>a_table_key</value></array><array><value dt:dt='string'>order</value><value dt:dt='string'>${id}</value></array></array></xml>`, "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='checklist_for_order_hdr'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            { headers }
        );

        const interactSyncRetrieve = await axios.post(URLInteractWithServer,
            { "stateId": stateID, "sessionId": sessionID, "macroName": "SyncRetrieve", "bcName": "Service_Order", "boAlias": "order_items", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='order_items'></BO><BO alias='checklist_for_order_items'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            { headers }
        );

        const retrieveAsAppendWithParams2 = await axios.post(URLInteractWithServer,
            { "stateId": stateID, "sessionId": sessionID, "macroName": "RETRIEVEASAPPENDWITHPARAMS", "bcName": "Service_Order", "boAlias": "checklist_for_order_items", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><array><value dt:dt='string'>table_name</value><value dt:dt='string'>table_key</value></array><array><value dt:dt='string'>item</value><value dt:dt='string'>180004</value></array><array><value dt:dt='string'>a_table_name</value><value dt:dt='string'>a_table_key</value></array><array><value dt:dt='string'>item</value><value dt:dt='string'>180004</value></array></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='checklist_for_order_items'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            { headers }
        );

        const unnamedMicroFinalize = await axios.post(URLInteractWithServer,
            { "stateId": stateID, "sessionId": sessionID, "macroName": "", "bcName": "Service_Order", "boAlias": "checklist_for_order_hdr", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"></root>\r\n", "requestStateXml": "", "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            { headers }
        );

        const getStateUI = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/GetStateUIExt?${hostName}`,
            { "stateId": stateID, "sessionId": sessionID, "bcName": "Service_Order", "xmlRequest": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='checklist_for_order_hdr'></BO></GetCurrentState></root>`, "moduleName": "service_order_maint" },
            { headers }
        );


        //const interactWithApply = await axios.post(URLInteractWithServer,
        //    { "stateId": stateID, "sessionId": sessionID, "macroName": "CheckSLAMacro", "bcName": "Service_Order", "boAlias": "main", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>False</value></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"3\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_is_apply status=\"8\">Apply</cc_is_apply></row></main></root>\r\n", "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='main'></BO><BO alias='demand_labor'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
        //    { headers }
        //);





        const dotnetFinalize = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/dotnet?${hostName}`,
            `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Header>
            <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
            </s:Header>
            <s:Body>
            <InteractWithServerExt xmlns="http://astea.services.wcf/">
                <stateId>${stateID}</stateId>
                <sessionId>${sessionID}</sessionId>
                <macroName/>
                <bcName>Service_Order</bcName>
                <boAlias>main</boAlias>
                <macroParameters>&lt;xml xmlns:dt='urn:schemas-microsoft-com:datatypes'&gt;
                &lt;array&gt;
                &lt;value dt:dt='string'&gt;
                &lt;/value&gt;
                &lt;/array&gt;
                &lt;/xml&gt;</macroParameters>
                <updateStateXml>
                &lt;root xmlns:dt="urn:schemas-microsoft-com:datatypes"&gt;
                    &lt;main&gt;
                        &lt;row status="8" number="1" serverStatus="3" attachmentsNum="0" primaryTable="order_line"&gt;
                            &lt;cc_eta_failure_code_optional status="8"&gt;Y&lt;/cc_eta_failure_code_optional&gt;
                            &lt;cc_recall_failure_code_optional status="8"&gt;Y&lt;/cc_recall_failure_code_optional&gt;
                            &lt;cc_resolve_failure_code_optional status="8"&gt;Y&lt;/cc_resolve_failure_code_optional&gt;
                        &lt;/row&gt;
                    &lt;/main&gt;
                    &lt;customer_authorization&gt;
                        &lt;row status="12" number="${rowNumber}" serverStatus="2"&gt;
                        &lt;comment_text status="8" len="2147483647"&gt;${message}&lt;/comment_text&gt;
                        &lt;/row&gt;
                    &lt;/customer_authorization&gt;
                &lt;/root&gt;&#xD;
                </updateStateXml>
                <requestStateXml/>
                <requestStateXPathFilter/>
                <saveState>true</saveState>
                <closeState>false</closeState>
                <moduleName/>
            </InteractWithServerExt>
            </s:Body>
            </s:Envelope>`,
            {
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "http://astea.services.wcf/IBCBaseContract/InteractWithServerExt",
                    "Accept-Encoding": "gzip, deflate",
                    "Host": "alliance.microcenter.com",
                    "Expect": "100-continue",
                    //"currentprofile": "Prod"
                }
            } //, "SOAPAction": "http://astea.services.wcf/IBCBaseContract/InteractWithServerExt"} }
        )

        const dotnetFinalize2 = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/dotnet?${hostName}`,
            `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><InteractWithServerExt xmlns="http://astea.services.wcf/"><stateId>${stateID}</stateId><sessionId>${sessionID}</sessionId><macroName/><bcName>Service_Order</bcName><boAlias>main</boAlias><macroParameters>&lt;xml xmlns:dt='urn:schemas-microsoft-com:datatypes'&gt;&lt;array&gt;&lt;value dt:dt='string'&gt;&lt;/value&gt;&lt;/array&gt;&lt;/xml&gt;</macroParameters><updateStateXml>&lt;root xmlns:dt="urn:schemas-microsoft-com:datatypes"&gt;&lt;customer_authorization&gt;&lt;row status="4" number="${rowNumber}" serverStatus="2"/&gt;&lt;/customer_authorization&gt;&lt;/root&gt;&#xD;
            </updateStateXml><requestStateXml/><requestStateXPathFilter/><saveState>true</saveState><closeState>false</closeState><moduleName/></InteractWithServerExt></s:Body></s:Envelope>`,
            {
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "http://astea.services.wcf/IBCBaseContract/InteractWithServerExt",
                    "Accept-Encoding": "gzip, deflate",
                    "Host": "alliance.microcenter.com",
                    "Expect": "100-continue",
                    //"currentprofile": "Prod"
                }
            }
        );

        const interactWithSave = await axios.post(URLInteractWithServer,
            {
                "stateId": stateID,
                "sessionId": sessionID,
                "macroName": "CheckSLAMacro",
                "bcName": "Service_Order",
                "boAlias": "main",
                "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>False</value></array></xml>`,
                "updateStateXml": `<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"0\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_is_apply status=\"8\">Save</cc_is_apply></row></main></root>\r\n`,
                "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='main'></BO><BO alias='demand_labor'></BO></GetCurrentState></root>`,
                "requestStateXPathFilter": "",
                "saveState": false,
                "closeState": false,
                "moduleName": "service_order_maint"
            },
            { headers }
        );

        console.log("Dotnet finalize", dotnetFinalize.data);
        let promises = [createBlankInteractionResp].map(response => {
            if (response.data['d'] && response.data['d'].length > 0)
                return parseXMLToJSON(response.data['d']);
            else return response.data;
        });

        const bigResp = await Promise.all(promises);

        //debugger;
        return res.send(createBlankInteractionRespJSON);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/interactions", async (req, res, next) => {
    const { id, message, index } = req.body;
    try {
        const svResp = await retrieveSV(id, false, req.session, true);
        const sv = svResp.serviceOrder;
        const { stateID, hostName } = sv.metadata;
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }

        //Create a new blank interaction
        const respMkInt = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            JSON.stringify({ "stateId": stateID, "sessionId": req.session.sessionID, "macroName": "new", "bcName": "Service_Order", "boAlias": "customer_authorization", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>", "updateStateXml": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>`, "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${stateID}'><BO alias='customer_authorization'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "//customer_authorization/row[last()]", "saveState": false, "closeState": false, "moduleName": "service_order_maint" }),
            {
                headers
            });

        //This should return a body of xml information for the nteraction
        const toXML = await parseXMLToJSON(respMkInt.data['d']);
        const totalRows = toXML.root.customer_authorization[0].$.totalRows;
        const rowNumber = toXML.root.customer_authorization[0].row[0].$.number;

        const prelim = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            { "stateId": stateID, "sessionId": req.session.sessionID, "macroName": "CheckSLAMacro", "bcName": "Service_Order", "boAlias": "main", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>False</value></array></xml>", "updateStateXml": "<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"0\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_is_apply status=\"8\">Apply</cc_is_apply></row></main></root>\r\n", "requestStateXml": "<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='b132082e-3221-4de8-83de-fd82d3fcc467'><BO alias='main'></BO><BO alias='demand_labor'></BO></GetCurrentState></root>", "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                }
            });

        //return res.send(toXML);
        //return;
        const makeBody = {
            "stateId": stateID,
            "sessionId": req.session.sessionID,
            "macroName": "",
            "bcName": "Service_Order",
            "boAlias": "main",
            "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>",
            "updateStateXml": `
            <root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\">
                <main>
                    <row status=\"8\" number=\"1\" serverStatus=\"3\" attachmentsNum=\"0\" primaryTable=\"order_line\">
                        <cc_eta_failure_code_optional status=\"8\">Y</cc_eta_failure_code_optional>
                        <cc_recall_failure_code_optional status=\"8\">Y</cc_recall_failure_code_optional>
                        <cc_resolve_failure_code_optional status=\"8\">Y</cc_resolve_failure_code_optional>
                    </row>
                </main>
                <customer_authorization>
                    <row status=\"12\" number=\"${rowNumber}\" serverStatus=\"2\">
                    <comment_text status=\"8\" len=\"2147483647\">${message}</comment_text>
                    </row>
                </customer_authorization>
            </root>\r\n`,
            "requestStateXml": "",
            "requestStateXPathFilter": "",
            "saveState": true, "closeState": false, "moduleName": "service_order_maint"
        }

        console.log("shot out req");
        const resp = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            makeBody,
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                }
            });

        const finalize = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/CloseUIExt?${hostName}`,
            { "stateId": stateID, "sessionId": req.session.sessionID, "bcName": "Service_Order", "moduleName": "service_order_maint" },
            { headers }
        );


        const finalizeForReal = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/ExecMacroUIExt`,
            { "macroName": "retrieve", "bcName": "Service_Order", "boAlias": "main", "macroParameters": `<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>${id}</value></array></xml>`, "sessionId": req.session.sessionID, "stateId": -1, "saveState": false, "closeState": false, "xmlRequest": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='service_request_maint' stateID='-1'><BO alias='main'></BO><BO alias='address_xref'></BO><BO alias='demand_labor'></BO><BO alias='demand_availability'></BO><BO alias='order_general_xref'></BO><BO alias='demand_link_xref_on_order'></BO><BO alias='access_hours'></BO><BO alias='checklist_for_order_hdr'></BO><BO alias='checklist_for_order_goods'></BO><BO alias='checklist_for_order_items'></BO><BO alias='checklist_for_order_services'></BO></GetCurrentState></root>`, "moduleName": "service_order_maint" },
            { headers }
        )

        const retrieveWhyIdk = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/DataViewMgr.svc/RetrieveXMLBatchNoLimitExt`,
            { "sessionID": req.session.sessionID, "XMLCriteria": "<FindBatch><Find entity_name='order_stat' query_name='service_order_stat_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='activity' query_name='mngt_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='project_status' query_name='psa_status_for_dynamic_ddlb'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='general_codes' query_name='get_entitle_values'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='order_activity' query_name='order_activity_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='severity' query_name='severity_with_empty_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='ans_list_lines' query_name='ans_list_lines_scrl'  getRecordCount='false' where_cond=\"1&lt;&gt;1\" ><operators values='=;'/><types values='argument;'/><is_replace_alias values='Y;'/></Find><Find entity_name='general_codes' query_name='num_format_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='urgency_codes' query_name='urgency_codes_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='impact_codes' query_name='impact_codes_lup'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='kpi' query_name='kpi_colors'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='kpi_dimension' query_name='kpi_dimension_state'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find><Find entity_name='tzone_utc' query_name='tzone_utc_scrl'  getRecordCount='false' ><operators values=''/><types values=''/><is_replace_alias values=''/></Find></FindBatch>" },
            { headers }
        )

        const retrieveXML = await parseXMLToJSON(retrieveWhyIdk.data['d']);
        console.log("RETRIAVL OF XML");
        console.log(retrieveXML);

        const finalizeXML = await parseXMLToJSON(finalizeForReal.data['d']);
        const newStateID = finalizeXML.root.$.StateID;
        console.log("Got new stateID", newStateID);
        //return res.send(finalizeXML);

        const finalizeForRealNoFakesies = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            { "stateId": newStateID, "sessionId": req.session.sessionID, "macroName": "", "bcName": "Service_Order", "boAlias": "", "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array></array></xml>", "updateStateXml": `<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"0\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_descr_text status=\"8\"></cc_descr_text><cc_is_apply status=\"8\"></cc_is_apply><cc_short_descr status=\"8\"></cc_short_descr></row></main></root>\r\n`, "requestStateXml": `<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='' stateID='${newStateID}'><BO alias='main'></BO></GetCurrentState></root>`, "requestStateXPathFilter": "", "saveState": false, "closeState": false, "moduleName": "service_order_maint" },
            { headers }
        )

        return res.send(finalizeForRealNoFakesies.data);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/interactions", async (req, res, next) => {
    const { id, history } = req.query;
    try {
        const interactions = await getInteractions(id, req.session, history === "y");
        return res.send(interactions);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/materials", async (req, res, next) => {
    const { id, history } = req.query;
    try {
        const materials = await getMaterials(id, req.session, history === "y");
        return res.send(materials);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/search", async (req, res, next) => {
    const criteria = req.query;
    try {
        return res.send(await orderLocatorSearch(req.session, criteria));
    } catch (e) {
        return next(e);
    }
});


module.exports = router;