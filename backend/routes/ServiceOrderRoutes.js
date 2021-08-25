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

        const resp = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                }
            });

        // return res.send(resp.data);
        //return res.send(await parseXMLToJSON(resp.data['d']));

        const applyBody = {
            "stateId": stateID,
            "sessionId": req.session.sessionID,
            "macroName": "",
            "bcName": "Service_Order",
            "boAlias": "customer_authorization",
            "macroParameters": "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'></value></array></xml>",
            "updateStateXml": `<root xmlns:dt=\"urn:schemas-microsoft-com:datatypes\"><main><row status=\"8\" number=\"1\" serverStatus=\"3\" attachmentsNum=\"0\" primaryTable=\"order_line\"><cc_eta_failure_code_optional status=\"8\">Y</cc_eta_failure_code_optional><cc_recall_failure_code_optional status=\"8\">Y</cc_recall_failure_code_optional><cc_resolve_failure_code_optional status=\"8\">Y</cc_resolve_failure_code_optional></row></main><customer_authorization><row status=\"12\" number=\"${index}\" serverStatus=\"2\"><comment_text status=\"8\" len=\"2147483647\">${message}</comment_text></row></customer_authorization></root>`
            ,
            "requestStateXml": "",
            "requestStateXPathFilter": "",
            "saveState": true,
            "closeState": false,
            "moduleName": "service_order_maint"
        }

        const resp3 = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?${hostName}`,
            applyBody,
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                }
            });

        return res.send(resp3.data);
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