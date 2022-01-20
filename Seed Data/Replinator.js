function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
nocache("./services/AsteaService")
const Astea = require("./services/AsteaService");
nocache("./services/ServiceUtils")
const { asteaQuery, xmlAsteaQuery, jsonAsteaQuery, params, entities } = require("./services/ServiceUtils");