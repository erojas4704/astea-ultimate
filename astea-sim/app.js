"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const webFramework = require("./routes/WebFramework");
const bodyParser = require("body-parser");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/Web_Framework", bodyParser.text({ type: "*/*" }));
app.use("/Web_Framework", webFramework);

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;