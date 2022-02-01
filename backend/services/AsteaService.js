require("dotenv").config();
const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;
const URLInteractWithServer = `${ASTEA_BASE_URL}/Web_Framework/BCBase.svc/InteractWithServerExt`;
const moment = require("moment");
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
const { Customer, Interaction, Material, Expense } = require("../models/Database");
const { jsonAsteaQuery, entities, getOrderStateBody, serviceModules, states, xmlAsteaQuery, ServiceUtils } = require("./ServiceUtils");
const { decodeFromAsteaGibberish } = require("../helpers/querying");
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
    if (!resp.data)
        return { error: new AsteaError("No data returned from Astea") };

    //TODO find the request being made from the body, then extract it from the response dynamically.
    //TODO make smartParse() function that handles all odd cases with data
    const json = resp.data['d'] ?
        await parseXMLToJSON(resp.data['d']) :
        await parseXMLToJSON(resp.data);

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

        if (executeMacro.error) throw executeMacro.error; //TODO get error code from type.
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


        const materials = Material.extractFromJSON(data);
        const expenses = Expense.extractFromJSON(data);
        const interactions = Interaction.extractFromJSON(data);

        Expense.parse(expenses, order.id);
        Material.parse(materials, order.id);
        return { materials, expenses, interactions };
    }

    static async materialSearch(criteria, session) {
        const body = jsonAsteaQuery(session, entities.MATERIAL, criteria);
        const { error, data } = await asteaRequest(URLRetrieveXML, body);
        if (error) throw new AsteaError(error, 500);
        const materials = Material.extractFromJSON(data);
        Material.parse(materials);
        return materials;
    }

    /**
     * Executes a search on Astea, using the given criteria.
     * @param {Object} criteria Search criteria
     * @param {Object} session Astea session object. This token allows us to actually communicate with Astea.
     * @returns {Promise<Object>} A promise that resolves to the search results.
     */
    static async locatorSearch(session, criteria, page = 1) {
        if(criteria.inHistory !== "N" && !criteria.openDateFrom){
            //If we do not specify history, we'll narrow down our search to only orders from the last 120 days.
            criteria.openDateFrom = moment().subtract(120, "days").format("YYYY-MM-DD");
        }
        const body = xmlAsteaQuery(session, entities.ORDER, { criteria }, page, false, true, "open_date");

        const { error, data } = await asteaRequest(
            URLSearch,
            body,
            {
                headers: {
                    SOAPAction: "http://astea.services.wcf/IDataViewMgrContract/RetrieveXMLExt",
                    "Content-Type": "text/xml; charset=utf-8"
                }
            }
        );

        const results = await parseSearchResults(data);
        return results;
        //TBI
    }
}

//TODO put this function somewhere it makes sense
async function parseSearchResults(data) {
    const resultsEncodedXML = data["s:Envelope"]["s:Body"][0]["RetrieveXMLExtResponse"][0]["RetrieveXMLExtResult"][0];
    //TODO Make these nasties a little cleaner.
    const resultsXML = decodeFromAsteaGibberish(resultsEncodedXML);
    const xmlResults = await parseXMLToJSON(resultsXML);

    if (!xmlResults.root.row) return [];

    const resultsPromises = xmlResults.root.row.map(async svRawData => await Order.parse(svRawData, false));
    return {
        meta: {
            totalCount: xmlResults.root.$.totalRecordCount,
            currentPage: xmlResults.root.$.currentPage,
            pageCount: xmlResults.root.$.pagesCount
        },
        results: await Promise.all(resultsPromises)
    }
}




module.exports = Astea;