const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const {
    headers,
    URLExecuteMacro,
    formatExecuteMacroBody: formatMacroBody,
    extractError
} = require("../js/astea");
const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");
const { Customer } = require("../models/Database");

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. 
*/
const asteaRequest = async (url, body) => {
    const resp = await axios.post(url, body, { headers });
    if (resp.data.ExceptionDetail)
        return { error: resp.data.ExceptionDetail.Type };

    const json = await parseXMLToJSON(resp.data['d']);
    return { raw: resp.data['d'], data: json };
}

class Astea {
    static async getServiceOrder(id, session) {
        const { sessionID: sessionId } = session;
        const executeMacro = await asteaRequest(URLExecuteMacro,
            formatMacroBody("retrieve", false, sessionId, id),
            { headers }
        );

        if (executeMacro.error) throw new AsteaError(executeMacro.error, 500); //TODO get error code from type.
        const orderData = await Order.parse(executeMacro.data);

        return { serviceOrder: orderData };
    }
}

module.exports = Astea;