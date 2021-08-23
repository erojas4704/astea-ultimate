const express = require('express');
const { parseXMLToJSON } = require('../helpers/xml');
const router = express.Router();
const fs = require('fs').promises;

router.post(`/BCBase.svc/ExecMacroUIExt`, async (req, res) => {
    console.log(req.body);
    const json = await parseXMLToJSON(req.body.xmlRequest);
    console.log(json);
    console.log(JSON.stringify(json));
    debugger;
    return res.json(req.body);
});

router.post(`/SecurityManager.svc/dotnet`, async (req, res) => {
    const loginData = await fs.readFile('./xml/login-succeed.xml');
    res.send(loginData);
});

module.exports = router;