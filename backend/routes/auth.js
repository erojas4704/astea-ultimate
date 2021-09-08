"use strict";
require("dotenv").config();
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { AsteaError } = require("../js/AsteaError");
const { loginToAstea, validateSessionID } = require("../astea/auth.js");
const { hasAsteaCredentials } = require("../middleware/asteaAuthentication");
const SECRET_KEY = process.env.SECRET_KEY;

router.get('/ValidateSession', hasAsteaCredentials, async (req, res, next) => {
    try {
        const sessionID = req.query.sessionID || req.session?.sessionID;
        if (!sessionID) {
            console.log("Logging user out. Missing session ID");
            res.clearCookie("astea-session");
            return res.json({ success: false });
        }
        const resp = await validateSessionID(sessionID);
        if(!resp.success) res.clearCookie("astea-session");
        return res.json( resp );
    } catch (e) {
        return next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let { username, password, forceKick } = req.body;
        if (password === "session") { //Hijack a session TODO: what if someone's password actually is session? Validate that the username is a session ID.
            const resp = await validateSessionID(username);
            if (resp.success) {
                const token = jwt.sign({
                    sessionID: username,
                    username
                }, SECRET_KEY);

                res.cookie("astea-session", JSON.stringify(token)); //Set the JWT token as a cookie, to be passed in future requests.
                return res.json({ success: true, sessionID: username });
            }
        }

        //TODO validate against our own local database of users. 
        const resp = await loginToAstea(username, password, forceKick);

        const token = jwt.sign({
            sessionID: resp.sessionID,
            encryptedSessionID: resp.encryptedSessionID,
            username
        }, SECRET_KEY);

        //TODO validate against our own local database of users. 

        res.cookie("astea-session", JSON.stringify(token)); //Set the JWT token as a cookie, to be passed in future requests.
        res.cookie("username", username);
        return res.json({ success: true, sessionID: resp.sessionID });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;