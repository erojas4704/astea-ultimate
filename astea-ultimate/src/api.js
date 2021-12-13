import axios from "axios";

class Api {

    static cancelableRequest(callback, ...params) {
        const cancelTokenSource = axios.CancelToken.source();
        const promise = callback(...params, cancelTokenSource.token);
        const cancel = cancelTokenSource.cancel;
        return { promise, cancel }
    }

    /** Returns a cancelable promise to retrieve a service order. 
     * @param {string} id - The service order id.
    */
    static async getServiceOrder(id, cancelTokenSource = null) {
        const resp = await axios.get('/ServiceOrder', {
            params: { id },
            cancelToken: cancelTokenSource?.token
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }

    /** Returns a cancelable promise to retrieve interactions.
     * @param {string} id - The service order id.
     */
    static async getInteractions(id, cancelTokenSource = null) {
        const resp = await axios.get('/ServiceOrder/interactions', {
            params: { id },
            cancelToken: cancelTokenSource?.token
        });

        if (resp.error) throw resp.error;
        return resp.data;
    }
}

export default Api;