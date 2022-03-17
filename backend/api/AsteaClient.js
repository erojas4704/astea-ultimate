require("dotenv").config();
const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;

const axios = require("axios");

const client = axios.create({
  baseURL: `${ASTEA_BASE_URL}/Web_Framework/`,
  headers: {
    "Content-Type": `text/xml; charset=utf-8`,
    currentprofile: "Prod",
    Host: "alliance.microcenter.com",
    Expect: "100-continue",
    "Accept-Encoding": "gzip, deflate",
  },
});

module.exports = client;
