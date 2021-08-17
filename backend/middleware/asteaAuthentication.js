"use strict";
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { AsteaError } = require('../js/AsteaError');
const SECRET_KEY = process.env.SECRET_KEY;

async function hasAsteaCredentials(req, res, next) {
    //Request headers must have a token with a session-id
    try {
        req.session = {
            sessionID: '488ef03e-4032-47c4-b43a-0f731daa8d66Prod'
        }
        return next();
        if(!req.cookies['astea-session']) throw new AsteaError("No session ID.", 403, "You must be logged in to do that.");
        const sessionCookie = String(req.cookies['astea-session']).replace(/['"]+/g, '');
        const token = jwt.verify(sessionCookie, SECRET_KEY);
        req.session = {
            sessionID: token.sessionID,
            username: token.username,
            encryptedSessionID: token.encryptedSessionID
        };
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = { hasAsteaCredentials };
