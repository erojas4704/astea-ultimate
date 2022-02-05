import axios from "axios";
import { store } from "./store";
import { logoutUser } from "./actions/user";

axios.interceptors.response.use(response => response, async error => {
    console.log(error, error.response.status);
    if (error.response.status === 401 || error.response.status === 403) {
        //Handle unauthorized
        console.error("Unauthorized. Logging out.");
        store.dispatch(logoutUser());
        await Api.logout(); //TODO reauth
    }
    return error;
});

class Api {

    /* Wraps a request in a function that returns a promise and a cancel callback. ALlows requests to be cancelled. 
        * @param {function} callback - The API call to make.
        * @param {function} cancel - The cancel callback.
        * @returns {promise, cancel} - An object containing the promise and the cancel function.
    */
    static req(callback, ...params) {
        //TODO second params should be an array for the callback params.
        const cancelTokenSource = axios.CancelToken.source();
        params.length = callback.length; //Make sure the last parameter is the cancel token.
        const promise = callback(...params, cancelTokenSource.token);
        const cancel = cancelTokenSource.cancel;
        return { promise, cancel }
    }

    /** Returns a cancelable promise to retrieve a service order. 
     * @param {string} id - The service order id.
    */
    static async getServiceOrder(id, useCached, history = false, cancelToken = null) {
        const resp = await axios.get(`/ServiceOrder/${id}`, {
            params: { cache: useCached ? "y" : null, history },
            cancelToken
        });
        if (resp.error || !resp.data) throw resp.message;
        return resp.data;
    }


    /** Returns a cancelable promise to retrieve interactions for a service order.
     * @param {string} id - The service order id.
     * @param {boolean} useCached - Whether to use cached data.
     * @param {cancelToken} cancelToken - A cancel token.
     * @returns {promise} - A promise to retrieve the interactions.
     */
    static async getInteractions(id, useCached, cancelToken = null) {
        const resp = await axios.get('/ServiceOrder/interactions', {
            params: { id, cache: useCached ? "y" : null },
            cancelToken
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    static async getDetails(id, useCached, cancelToken = null) {
        const resp = await axios.get(`/ServiceOrder/${id}/details`, {
            params: { cache: useCached ? "y" : null },
            cancelToken
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    /** Returns a cancelable promise to search for service orders.
     * @param {Object} query - Criteria to search for.
     */
    static async search(query, useCached = false, pageLimit = 1, cancelToken = null) {
        const pull = async (page) => {
            return axios.get('/ServiceOrder/search', {
                params: { ...query, cache: useCached ? "y" : null, page },
                cancelToken
            });
        }

        //TODO docs and consider a callback whenever new pages come in
        const resp = await pull(1);

        console.log(`Pagecount: ${resp.data.meta.pageCount} Limit ${pageLimit}`)

        if (resp.data.meta.pageCount > 1 && pageLimit > 1) {
            const pagePromises = [];
            for (let i = 2; i <= resp.data.meta.pageCount & i < pageLimit; i++) {
                pagePromises.push(pull(i));
            }

            const remainingPages = await Promise.all(pagePromises);
            resp.data.results = [...resp.data.results, ...remainingPages.flatMap(x => x.data.results)];
        }

        console.log(resp.data);

        if (resp.error) throw resp.error;
        return resp.data;
    }

    /** Returns a cancelable promise to search for materials
     * @param {Object} query - Criteria to search for.
     */
    static async searchMaterials(query, useCached, limit = 100, cancelToken = null) {
        const resp = await axios.get('/materials/search', {
            params: { ...query, cache: useCached ? "y" : null, limit },
            cancelToken
        });

        if (resp.data.error) throw resp.data.error;

        return resp.data;
    }

    /** Creates an interaction for the given service order.
     * @param {string} id The service order id.
     * @param {string} message The message to send.
     */
    static async createInteraction(id, message, cancelToken = null) {
        const resp = await axios.post("/ServiceOrder/Interactions",
            { id, message },
            { cancelToken }
        );

        if (resp.error) throw resp.error;
        return resp.data
    }

    /** Log the user out. Returns true if successful. */
    static async logout() {
        const resp = await axios.post("/auth/logout");
        if (resp.data.success) return true;
        return false;
    }

    /** Log the user in. Returns sessionId if successful, undefined if not. Sets a JWT cookie. */
    static async login(username, password, cancelToken = null) {
        try {
            const resp = await axios.post("/auth/login",
                { username, password, forceKick: true },
                { cancelToken }
            );

            //Login returns {success, sessionID} if successful. 
            //TODO should return username as well.
            if (resp.data.success)
                return { sessionId: resp.data.sessionID }; //TODO sessionID should be sessionId
            else return;
        } catch (e) {
            return;
        }
    }

    /**
     * Assigns a technician to a service order.
     * @param {string} orderId The service order id.
     * @param {string} technicianId The technician id.
     */
    static async assignTechnician(orderId, technicianId) {
        //const cancelToken = arguments[arguments.length-1] //TODO consider using this
        //TODO more robust error handling
        const resp = await axios.patch(`/ServiceOrder/${orderId}/assign`,
            { technicianId }
        );

        //Will get a new version of the service order.
        return resp.data;
    }

    static async addAudit(id, name, location = "SD", status = 0) {
        if (!name) throw new Error("Audit name is required");
        const resp = await axios.post(`/Audit`, {
            id,
            location,
            status,
            name
        });
        return resp.data;
    }

    /**
     * Gets the audits for a given order id.
     * @param {string} id Service Order ID.
     * @returns {array} An array of audits for the order.
     */
    static async getAuditsForOrder(id) {
        const resp = await axios.get(`/Audit/order/${id}`);
        return resp.data;
    }

    /**
     * Gets the audits for a given audit name.
     * @param {string} name 
     * @returns {array} An array of audits under that name.
     */
    static async getAuditByName(name) {
        const resp = await axios.get(`/Audit/${name}`);
        return resp.data;
    }

    /**
     * Makes sure the current login session is still valid.
     * Returns true if so.
     * @returns {boolean} True if the session is valid.
     */
    static async validateSession() {
        const resp = await axios.get("/auth/ValidateSession");
        return resp.data.success;
    }
}

export default Api;