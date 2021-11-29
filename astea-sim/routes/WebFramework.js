const express = require('express');
const { parseXMLToJSON } = require('../helpers/xml');
const { getServiceOrder } = require('../astea/macros');
const router = express.Router();
const fs = require('fs').promises;
const { extractLoginDataFromJSON, extractSearchCriteriaFromJSON, sanitizeXMLString, extractFromAsteaQuery, searchResultsToAsteaGibberish } = require('../helpers/parsers');
const { loginToAstea } = require('../auth/auth');
const forFakeDelay = require('../helpers/fakeDelay');
const { getAllServiceOrders } = require('../astea/sv');

const asteaMacros = {
    "service_request_maint": getServiceOrder
}

router.post(`/BCBase.svc/ExecMacroUIExt`, async (req, res) => {
    const json = await parseXMLToJSON(req.body.xmlRequest);
    const macro = extractMacro(json);
    asteaMacros[macro]()

    return res.json(req.body);
});

router.post(`/SecurityManager.svc/dotnet`, async (req, res) => {
    const json = await parseXMLToJSON(req.body);
    const { username, password } = extractLoginDataFromJSON(json);
    const sessionId = await loginToAstea(username, password);

    await forFakeDelay();

    if (sessionId) {
        const loginData = await fs.readFile('./xml/login-succeed.xml');
        res.send(loginData);
    } else {
        res.send((await fs.readFile('./xml/login-fail.xml')));
    }
});

/**Run an Astea search */
router.post(`/DataViewMgr.svc/dotnet`, async (req, res, next) => {
    try {
        //http://astea.services.wcf/IDataViewMgrContract/RetrieveXMLExt
        const action = req.headers["soapaction"].match(/\/([^\/]+)\/?$/)[1].replace(/\W*/g, '');
        if (action === "RetrieveXMLExt") {
            const xml = sanitizeXMLString(req.body);
            const json = await parseXMLToJSON(xml);
            const XMLCriteria = extractSearchCriteriaFromJSON(json);
            const query = XMLCriteria["Find"][0]["$"]["where_cond1"];
            const { actionGroup, id, name, tag, serial } = extractFromAsteaQuery(query);
            const serviceOrders = await getAllServiceOrders();
            const filtered = [];
            //SV2107240204@@1 Breaks
            Object.values(serviceOrders).forEach(serviceOrder => {
                if (
                    (id && serviceOrder.id?.includes(id)) ||
                    (name && serviceOrder.name?.includes(name)) ||
                    (tag && serviceOrder.tag?.includes(tag)) ||
                    (serial && serviceOrder.serial?.includes(serial)) ||
                    (actionGroup && serviceOrder.actionGroup?.includes(actionGroup))
                ) filtered.push(serviceOrder);
            });

            const xmlResult = searchResultsToAsteaGibberish(filtered);

            console.log(xmlResult);
            return res.send(xmlResult);
        }

    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;