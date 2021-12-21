
const { default: axios } = require("axios");
const express = require("express");
const app = express();
module.exports = app;

let cookie = "";

app.get('/', (req, res) => {
    res.sendFile("./pages/index.html", { root: __dirname });
})
app.get('/login', async (req, res) => {
    const log = await axios.post('http://localhost:6001/auth/login', {
        "username": "64e86d2e-d374-4311-b53c-833e28b62678Prod",
        "password": "session"
    });
    cookie = log.headers['set-cookie'];
    return res.send(log.data);
});
app.get('/test', async (req, res) => {
    //login
    const resp = await axios.get(
        'http://localhost:6001/ServiceOrder/SV2110020507@@1?cache=y',
        { headers: { cookie }}
    );
    res.send(resp.data);
});