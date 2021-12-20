const { AsteaError } = require("../js/AsteaError");
const Order = require("../models/Order");

class OrderService {
    /**
     * Returns a work order from our local database
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     * @param {boolean} useCached Whether or not we should reference the order on our local database. If true and not found, we return a 404 error.
     */
    static async retrieve(id, session) {
        const cachedOrder = await Order.findOne({ where: { id: id } });
        const serviceOrder = { ...cachedOrder.dataValues }
        serviceOrder.customer = await cachedOrder.getCustomer();
        serviceOrder.technician = await cachedOrder.getTechnician();
        
        return { serviceOrder }
    }
}

module.exports = OrderService;