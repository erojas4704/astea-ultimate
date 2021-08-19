"use strict";

const app = require("./app");
const precache = require("./helpers/precache");

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});



precache();