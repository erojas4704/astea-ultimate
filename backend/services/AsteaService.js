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
    URLRetrieveXML
} = require("../js/astea");
const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");
const { Customer, Interaction, Material } = require("../models/Database");
const { jsonAsteaQuery, entities, getOrderStateBody } = require("./ServiceUtils");
//WARNING: requiring Interaction breaks GetOrder.

const parseXMLToJSON = promisify(xml2js.parseString);

/**Automatically parses Astea responses to JSON and extracts errors. 
*/
const asteaRequest = async (url, body, options = {}) => {
    if (options.HostName) url = `${url}?${options.HostName}`; //Extract Method FormatURL
    const resp = await axios.post(url, body, { headers });
    debugger;
    if (resp.data.ExceptionDetail)
        return { error: resp.data.ExceptionDetail.Type };

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

    static async getMaterials(id, session) {

    }

    static async getDemands(id, session) {
        //We need an open state.
    }

    /**
     * Get demands, materials, and interactions from an order.
     * @param {string} id Order ID
     * @param {Object} session Astea session
     */
    static async getAll(id, session) {
        const { HostName, StateID } = (await this.getServiceOrder(id, session)).serviceOrder;
        const xmlRequest = getOrderStateBody(
            StateID,
            session.sessionID,
            ["customer_authorization", ]
        )
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