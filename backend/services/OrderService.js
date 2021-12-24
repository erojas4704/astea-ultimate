const { AsteaError } = require("../js/AsteaError");
const { Interaction, Technician } = require("../models/Database");
const Order = require("../models/Order");

class OrderService {
    /**
     * Returns a work order from our local database
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     */
    static async retrieve(id) {
        const cachedOrder = await Order.findOne({ where: { id: id } });
        if (!cachedOrder) throw new AsteaError("Astea Error", 404, "Order not found");
        const serviceOrder = { ...cachedOrder.dataValues }
        serviceOrder.customer = await cachedOrder.getCustomer();
        serviceOrder.technician = await cachedOrder.getTechnician();

        return { serviceOrder }
    }

    /**
     * Retrieves all interactions for a service order
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     */
    static async getInteractionsFor(id) {
        const interactions = await Interaction.findAll({
            where: {
                OrderId: id
            },
            include: {
                model: Technician
            }
        })

        return interactions;
    }
}

module.exports = OrderService;