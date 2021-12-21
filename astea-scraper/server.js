"use strict";
const app = require("./ioBasicTesting");
require("dotenv").config();

const PORT = 4052;

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});