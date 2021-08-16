"use strict";
require("dotenv").config();
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { AsteaError } = require("../js/AsteaError");
const { loginToAstea } = require("../astea/auth.js");
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/login', async (req, res, next) => {
    try {
        let { username, password, forceKick } = req.body;
        const resp = await loginToAstea(username, password, forceKick);

        const token = jwt.sign({
            sessionID: resp.sessionID,
            encryptedSessionID: resp.encryptedSessionID,
            username
        }, SECRET_KEY);

        //TODO validate against our own local database of users. 

        res.cookie("astea-session", JSON.stringify(token)); //Set the JWT token as a cookie, to be passed in future requests.
        res.cookie("username", username);
        return res.send("success");
    } catch (e) {
        return next(e);
    }
});

module.exports = router;