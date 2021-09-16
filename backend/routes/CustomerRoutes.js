"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { retrieveSV, orderLocatorSearch, getInteractions, getMaterials, createInteraction } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
const { parseXMLToJSON } = require("../helpers/xml.js");
const { AsteaError } = require("../js/AsteaError.js");
const { customerLookup } = require("../js/asteaCustomers.js");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get('/search', async (req, res, next) => {
    try {
        const resp = await customerLookup(req.session, req.query);
        return res.send(resp);
    }catch(err){
        return next(err);
    }
});

module.exports = router;