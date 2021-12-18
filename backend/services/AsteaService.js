const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const {
    URLExecuteMacro,
    formatExecuteMacro: formatMacroBody
} = require("../js/astea");
const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. */
const asteaRequest = async (url, body) => {
    const resp = await axios.post(url, body, { headers });
    if (resp.data.ExceptionDetail)
        return { error: resp.data.ExceptionDetail.Type };

    const json = await parseXMLToJSON(resp.data['d']);
    return { raw: resp.data['d'], data: json };
}

class Astea {
    static async getServiceOrder(id, session) {
        const { sessionId } = session;
        const executeMacro = await asteaRequest(URLExecuteMacro,
            formatMacroBody("retrieve", "N", sessionId, id),
            { headers }
        );

        if (executeMacro.error) throw new AsteaError(executeMacro.error, 500); //TODO get error code from type.
        const serviceOrder = Order.parse(executeMacro.data);
        serviceOrder.save().then(() => {
            console.log(`Cached service order ${id}`);
        }).catch(err => {
            console.error(`Error caching service order ${id}`, err);
        });

        return serviceOrder;
    }
}

module.exports = Astea;