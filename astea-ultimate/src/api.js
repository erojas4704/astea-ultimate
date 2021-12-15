import axios from "axios";

axios.interceptors.response.use(async response => {
    if (response.status === "401" || response.status === "403") {
        //Handle unauthorized
        await Api.logout(); //TODO reauth
    }
    return response;
});

class Api {

    /* Wraps a request in a function that returns a promise and a cancel callback. ALlows requests to be cancelled. 
        * @param {function} callback - The API call to make.
        * @param {function} cancel - The cancel callback.
        * @returns {promise, cancel} - An object containing the promise and the cancel function.
    */
    static req(callback, ...params) {
        const cancelTokenSource = axios.CancelToken.source();
        const promise = callback(...params, cancelTokenSource.token);
        const cancel = cancelTokenSource.cancel;
        return { promise, cancel }
    }

    /** Returns a cancelable promise to retrieve a service order. 
     * @param {string} id - The service order id.
    */
    static async getServiceOrder(id, cancelToken = null) {
        const resp = await axios.get('/ServiceOrder', {
            params: { id },
            cancelToken
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    static async search(query, cancelToken = null) {
        const resp = await axios.get('/ServiceOrder/search', {
            params: { ...query },
            cancelToken
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    /** Returns a cancelable promise to retrieve interactions.
     * @param {string} id - The service order id.
     */
    static async getInteractions(id, cancelToken = null) {
        const resp = await axios.get('/ServiceOrder/interactions', {
            params: { id },
            cancelToken
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    /** Log the user out. Returns true if successful. */
    static async logout() {
        const resp = await axios.post("/auth/logout");
        if (resp.data.success) return true;
        return false;
    }

    /** Log the user in. Returns sessionId if successful, undefined if not. Sets a JWT cookie. */
    static async login(username, password, cancelToken = null) {
        const resp = await axios.post("/auth/login",
            { username, password },
            { cancelToken }
        );

        console.log("LOGIN CALLED DUDE ", resp);
        //Login returns {success, sessionID} if successful. 
        //TODO should return username as well.
        if (resp.data.success)
            return { sessionId: resp.data.sessionID }; //TODO sessionID should be sessionId
        else return;
    }

    static async validateSession(){
        const resp = await axios.get("/auth/ValidateSession");
        return resp.data.success;
    }
}

export default Api;