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

router.post("/interactions", async (req, res, next) => {
    const { id, message, index } = req.body;
    try {
        const svResp = await retrieveSV(id, false, req.session);
        const sv = svResp.serviceOrder;
        const { stateID, hostName } = sv.metadata;
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }

        const requestBody = {
            "stateId": stateID,
            "sessionId": req.session.sessionID,
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