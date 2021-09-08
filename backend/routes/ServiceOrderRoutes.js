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
            "CurrentProfile": "Prod",
            "Cache-Control": "no-cache",
            "Cookie": `ComputerID_Prod__erojas1=${sessionID}; ASPSESSIONIDCADCSBAT=JEKALPMAEEEIFIFCMAHLOKKE`
        };

        //Need to get interactions first before creating a new one.
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
                    "CurrentProfile": "Prod",
                    "X-Requested-With": "XMLHttpRequest",
                    "Referer": "https://alliance.microcenter.com/AsteaAlliance110/form_asp/service_request_maint.shtml",
                    "Connection": " Keep-Alive",
                    "Cache-Control": "no-cache",
                }
            }
        );//Headers seem to have no bearing on what kind of response I get. It's creating blank customer authorization records, but not interactions.

        const createBlankInteractionRespJSON = await parseXMLToJSON(createBlankInteractionResp.data['d']);
        const totalRows = createBlankInteractionRespJSON.root.customer_authorization[0].$.totalRows;
        const rowNumber = createBlankInteractionRespJSON.root.customer_authorization[0].row[0].$.number;

        console.log(createBlankInteractionResp.data);

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
                    "currentprofile": "Prod"
                }
            } //, "SOAPAction": "http://astea.services.wcf/IBCBaseContract/InteractWithServerExt"} }
        )

        // const dotnetFinalize2 = await axios.post(`https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/dotnet?${hostName}`,
        //     `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><InteractWithServerExt xmlns="http://astea.services.wcf/"><stateId>${stateID}</stateId><sessionId>${sessionID}</sessionId><macroName/><bcName>Service_Order</bcName><boAlias>main</boAlias><macroParameters>&lt;xml xmlns:dt='urn:schemas-microsoft-com:datatypes'&gt;&lt;array&gt;&lt;value dt:dt='string'&gt;&lt;/value&gt;&lt;/array&gt;&lt;/xml&gt;</macroParameters><updateStateXml>&lt;root xmlns:dt="urn:schemas-microsoft-com:datatypes"&gt;&lt;customer_authorization&gt;&lt;row status="4" number="${rowNumber}" serverStatus="2"/&gt;&lt;/customer_authorization&gt;&lt;/root&gt;&#xD;
        //     </updateStateXml><requestStateXml/><requestStateXPathFilter/><saveState>true</saveState><closeState>false</closeState><moduleName/></InteractWithServerExt></s:Body></s:Envelope>`,
        //     {
        //         headers: {
        //             "Content-Type": "text/xml; charset=utf-8",
        //             "SOAPAction": "http://astea.services.wcf/IBCBaseContract/InteractWithServerExt",
        //             "Accept-Encoding": "gzip, deflate",
        //             "Host": "alliance.microcenter.com",
        //             "Expect": "100-continue",
        //             "currentprofile": "Prod"
        //         }
        //     }
        // );

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

        //debugger;
        return res.send(createBlankInteractionRespJSON);
    }
    catch (e) {
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