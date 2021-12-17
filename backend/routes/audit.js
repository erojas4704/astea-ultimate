"use strict";
const AuditService = require("../js/AuditService");
const express = require("express");

require("dotenv").config();
const router = new express.Router();

router.post("/", async (req, res, next) => {
    //Create new audit
    const audit = await AuditService.create(req.body);
    console.log(req.body);
    return res.json(audit);
});

/**
 * Gets all audits that share a name.
 */
router.get("/:name", async (req, res, next) => {
    const audits = await AuditService.getByName(req.params.name);
    return res.json(audits);
});

/**
 * Gets all audits for a specific order.
 */
router.get("/order/:id", async (req, res, next) => {
    const audits = await AuditService.getByOrderId(req.params.id);
    return res.json(audits);
});

module.exports = router;