const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const {
    headers,
    URLExecuteMacro,
    formatExecuteMacroBody: formatMacroBody,
    extractError,
    URLCommandBase,
    formatCommandBody
} = require("../js/astea");

const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;
const URLInteractWithServer = `${ASTEA_BASE_URL}/Web_Framework/BCBase.svc/InteractWithServerExt`

const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. 
*/
const asteaRequest = async (url, body, options = {}) => {
    if (options.HostName) url = `${url}?${options.HostName}`;
    const resp = await axios.post(url, body, { headers });

    if (resp.data.ExceptionDetail)
        return { error: resp.data.ExceptionDetail.Type };

    const json = await parseXMLToJSON(resp.data['d']);
    return { raw: resp.data['d'], data: json };
}

class Astea {
    static async getServiceOrder(id, session) {
        const { sessionID: sessionId } = session;
        const executeMacro = await asteaRequest(
            URLExecuteMacro,
            formatMacroBody("retrieve", false, sessionId, id),
            { headers }
        );

        if (executeMacro.error) throw new AsteaError(executeMacro.error, 500); //TODO get error code from type.
        const orderData = await Order.parse(executeMacro.data);

        return { serviceOrder: orderData };
    }

    static async getInteractions(id, session) {
        const { serviceOrder } = await this.getServiceOrder(id, session);
        const { HostName, StateID } = serviceOrder.metadata;
        const { error, data } = await asteaRequest(
            `${URLCommandBase}/GetStateUIExt`,
            formatCommandBody(
                StateID,
                session.sessionID,
                serviceOrder.isInHistory ? "customer_authorization_history" : "customer_authorization",
                serviceOrder.isInHistory
            ),
            { HostName }
        );

        return data;
    }
}

module.exports = Astea;