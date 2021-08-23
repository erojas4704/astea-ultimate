"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { toActionGroupID } = require("../helpers/actionGroups");
const { getTechniciansInActionGroup } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get('/', async (req, res, next) => {
    try {
        const actionGroup = req.query.actionGroup;
        const actionGroupID = toActionGroupID(actionGroup);
        const resp = await getTechniciansInActionGroup(req.session.sessionID, actionGroupID);
        res.send(resp);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;