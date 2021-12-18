const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");
const Astea = require("./AsteaService");

class OrderService {
    /**
     * Returns a work order from Astea.
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     * @param {boolean} useCached Whether or not we should reference the order on our local database. If true and not found, we return a 404 error.
     */
    static async retrieve(id, session, useCached = false) {
        if(useCached){
            const cachedOrder = await Order.findOne({ id: id });
            if(!cachedOrder) throw new AsteaError(404, "Order not found");
            return cachedOrder;
        }

        return await Astea.getServiceOrder(id, session);
    }
}

module.exports = OrderService;