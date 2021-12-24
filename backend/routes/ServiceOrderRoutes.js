"use strict";
const express = require("express");
const axios = require("axios");

const router = new express.Router();
const { retrieveSV, orderLocatorSearch, getInteractions, getMaterials, createInteraction, assignTechnician } = require("../js/astea.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication.js");
const { parseXMLToJSON } = require("../helpers/xml.js");
const { AsteaError } = require("../js/AsteaError.js");
const Astea = require("../services/AsteaService.js");
const OrderService = require("../services/OrderService.js");
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

router.get("/search", async (req, res, next) => {
    const criteria = req.query;
    // debugger;
    try {
        return res.send(await orderLocatorSearch(req.session, criteria));
    } catch (e) {
        return next(e);
    }
});

/** Assign technician to service order */
router.patch("/:id/assign", async (req, res, next) => {
    const { id } = req.params;
    const { technicianId } = req.body;

    try {
        const data = await assignTechnician(id, req.session, technicianId);
        //Should return an updated service order
        return res.send(data);
    } catch (err) {
        return next(err);
    }
});


/** Create a new interaction */
router.post("/interactions", async (req, res, next) => {
    const { id, message } = req.body;
    try {
        const interactionResp = await createInteraction(id, req.session, message);
        return res.send(interactionResp);
    }
    catch (e) {
        return next(e);
    }
});

/** Get interactions for an SV */
router.get("/interactions", async (req, res, next) => {
    const { id, history, cache } = req.query;
    try {
        const interactions = cache ?
            await OrderService.getInteractionsFor(id) :
            await Astea.getInteractions(id, req.session, history === "y");
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
        // console.error(e);
        return next(e);
    }
});

/** Get a service order by ID */
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { history, cache } = req.query;
    try {
        const sv = cache ?
            await OrderService.retrieve(id) :
            await Astea.getServiceOrder(id, req.session, history === "true");

        return res.send(sv.serviceOrder);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});


module.exports = router;