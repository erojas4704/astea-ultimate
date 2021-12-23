const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;
const URLInteractWithServer = `${ASTEA_BASE_URL}/Web_Framework/BCBase.svc/InteractWithServerExt`
const {
    headers,
    URLExecuteMacro,
    formatExecuteMacroBody: formatMacroBody,
    formatCommandBody,
    URLCommandBase,
    extractError
} = require("../js/astea");
const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");
const { Customer, Interaction } = require("../models/Database");
//WARNING: requiring Interaction breaks GetOrder.

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. 
*/
const asteaRequest = async (url, body, options = {}) => {
    if (options.HostName) url = `${url}?${options.HostName}`; //Extract Method FormatURL
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
        //TODO consider just returning the whole order.
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

        const interactions = Interaction.extractFromJSON(data);
        Interaction.parse(interactions, serviceOrder);
        return interactions;
    }
}

module.exports = Astea;