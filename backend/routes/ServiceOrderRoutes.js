"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { retrieveSV, orderLocatorSearch } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get("/raw", async (req, res, next) => {
    const { id } = req.query;
    try {
        const sv = await retrieveSV(id, req.session);
        return res.send(sv.json);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/", async (req, res, next) => {
    const { id } = req.query;
    try {
        const sv = await retrieveSV(id, req.session);
        return res.send(sv.serviceOrder);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get("/search", async (req, res, next) => {
    const criteria = req.query;
    try{
        return res.send( await orderLocatorSearch( req.session, criteria ) );
    }catch (e) {
        return next(e);
    }
});


module.exports = router;