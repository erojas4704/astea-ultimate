require("dotenv").config();
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
    URLSearch,
    extractError,
    URLRetrieveXML,
    URLGetStateUI
} = require("../js/astea");
const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");
const { Customer, Interaction, Material } = require("../models/Database");
const { jsonAsteaQuery, entities, getOrderStateBody, serviceModules, states } = require("./ServiceUtils");
//WARNING: requiring Interaction breaks GetOrder.

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. 
 * @param {string} url - Astea URL to invoke.
 * @param {string} body - Body of the request. Prefer to use a body format function.
 * @param {Object} options - Options for the request. Here you can pass a HostName or header overrides.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
*/
const asteaRequest = async (url, body, options = {}) => {
    if (options.HostName) url = `${url}?${options.HostName}`; //Extract Method FormatURL
    const reqHeaders = options.headers ? { ...headers, ...options.headers } : headers; //Headers overrides

    const resp = await axios.post(url, body, { headers: reqHeaders });
    if (resp.data.ExceptionDetail)
        return { error: new AsteaError(resp.data) };

    const json = await parseXMLToJSON(resp.data['d']);
    return { raw: resp.data['d'], data: json };
}

class Astea {
    static async getServiceOrder(id, session, history = false) {
        const { sessionID: sessionId } = session;

        const pull = async (checkHistory) => {
            let resp = await asteaRequest(
                URLExecuteMacro,
                formatMacroBody("retrieve", checkHistory, sessionId, id),
                { headers }
            );

            if (resp.error && checkHistory === false) resp = await pull(true);
            return resp;
        }

        const executeMacro = await pull(history);

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

    static async createInteraction(id, session, message) {
        const { HostName, StateID } = (await this.getServiceOrder(id, session)).serviceOrder;
        const { error, data } = await asteaRequest(
            URLInteractWithServer
        );
    }

    /**
     * A higher order function used to wrap a method to retrieve information from a service order.
     * This function will first retrieve a HostName and StateID from the order, which are necessary when working with Astea
     * so that we may manipulate it then.
     * @param {string} id 
     * @param {Object} session 
     * @param {function} callback A callback derived from the following signature: (order, session, hostName, stateId)
     * @returns {Promise<Object>}
     */
    static async getStateDetails(id, session, callback) {
        const { serviceOrder } = await this.getServiceOrder(id, session);
        const { HostName, StateID } = serviceOrder.metadata;
        return await callback(serviceOrder, session, HostName, StateID);
    }

    /**
     * Get demands, materials, and interactions from an order.
     * @param {string} id Order ID
     * @param {Object} session Astea session
     */
    static async getAllDetailsFromOrder(order, session, hostName, stateId) {
        const body = getOrderStateBody(
            stateId,
            session.sessionID,
            serviceModules.serviceOrder,
            [states.interactions, states.expenses, states.materials]
        );


        const { error, data } = await asteaRequest(
            URLGetStateUI,
            body,
            { HostName: hostName } //TODO naming uniformity for HostName
        );

        if (error) throw error;
        return data;
    }

    static async materialSearch(criteria, session) {
        const body = jsonAsteaQuery(session, entities.MATERIAL, criteria);
        const { error, data } = await asteaRequest(URLRetrieveXML, body);
        if (error) throw new AsteaError(error, 500);
        const materials = Material.extractFromJSON(data);
        Material.parse(materials);
        return data;
    }
}





module.exports = Astea;