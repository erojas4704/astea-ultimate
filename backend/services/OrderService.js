const { AsteaError } = require("../js/AsteaError");
const { Interaction, Technician, Expense, Material } = require("../models/Database");
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
        serviceOrder.materials = await cachedOrder.getMaterials() || [];
        serviceOrder.expenses = await cachedOrder.getExpenses() || [];
        serviceOrder.interactions = await cachedOrder.getInteractions() || [];

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

    /**
     * Retrieves all a service order with cached details
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     */
    static async getDetailsFor(id) {
        const cachedOrder = await Order.findOne({
            where: { id: id },
            include: [
                { model: Expense },
                { model: Material },
            ]
        });

        return {
            materials: cachedOrder.dataValues.materials?.map(
                material => ({...material.dataValues, ...material.dataValues.OrderMaterial})
            ) || [],
            expenses: cachedOrder.dataValues.expenses?.map(
                expense => ({...expense.dataValues, ...expense.dataValues.OrderExpense})
            ) || [],
        }
    }
}

module.exports = OrderService;