"use strict";
require("dotenv").config();
const express = require("express");
const svRoutes = require("./routes/ServiceOrderRoutes.js");
const customerRoutes = require("./routes/CustomerRoutes.js");
const technicianRoutes = require("./routes/TechnicianRoutes.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require('cookie-parser');
const audit = require("./routes/audit.js");

const app = express();
module.exports = app;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
app.use("/Customer", customerRoutes);
app.use("/ServiceOrder", svRoutes);
app.use("/Audit", audit);
app.use("/Technician", technicianRoutes);
app.use("/auth", authRoutes);

/** Unauthorized error handler; We clear sessions here. */
app.use( (err, req, res, next) => {
    const status = err.status;
    if(status > 400 && status < 404){
        res.clearCookie("astea-session");
    }
    next(err);
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});