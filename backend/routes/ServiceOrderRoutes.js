"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { retrieveSV, orderLocatorSearch, getInteractions, getMaterials, createInteraction } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
const { parseXMLToJSON } = require("../helpers/xml.js");
const { AsteaError } = require("../js/AsteaError.js");
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
        const interactionResp = await createInteraction(id, req.session, message)

        return res.send(interactionResp);
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