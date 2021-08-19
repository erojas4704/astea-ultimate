const { loginToAstea } = require("../astea/auth");
const { orderLocatorSearch } = require("../js/astea");
const { USERNAME, PASSWORD, PRECACHE } = process.env;
require("dotenv").config();

async function precache() {
    if(PRECACHE !== "true") return;

    try {
        const session = await loginToAstea(USERNAME, PASSWORD, false);
        const results = await orderLocatorSearch(session, {actionGroup: "QNTech"});
        console.log(results);
    } catch (e) {
        console.log("Could not precache Astea data", e);
    }
}

module.exports = precache;