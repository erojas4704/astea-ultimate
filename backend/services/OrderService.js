const { Op } = require("sequelize/dist");
const { AsteaError } = require("../js/AsteaError");
const Customer = require("../models/Customer");
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

    static async search(criteria) {
        //TODO dynamically grab all columns and search for them
        const query = {
            where: {
                [Op.or]: []
            }
        }

        const ignoreKeys = [
            "createdAt",
            "updatedAt",
            "openDate",
            "statusId",
            "isInHistory"
        ];

        const additionalKeys = [
            "customerName",
            "technicianName"
        ]

        const foreignKeys = {
            "customerName": {
                model: Customer,
                targetKey: "name"
            },
            "technicianName": {
                model: Technician,
                targetKey: "name"
            }
        }

        if (criteria.all) {
            for (let key in Order.rawAttributes) {
                if (ignoreKeys.includes(key)) continue;

                query.where[Op.or].push({ [key]: { [Op.iLike]: `%${criteria.all}%` } });
            }
            delete criteria.all
        }

        query.where = {
            ...query.where,
            [Op.and]: {
                id: {
                    [Op.iLike]: `%%`
                }
            }
        }

        query.include = [{
            model: Customer,
            where: {
                name: {
                    [Op.iLike]: `%${criteria.all}%`
                }
            },
            required: false
        }]

        //TODO left off here
        console.log(query);

        const orders = await Order.findAll(query)
            .catch(err => console.log(`Error running search. ${err}`));

        return orders;
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

        const interactions = await cachedOrder.getInteractions() || [];

        return {
            interactions,
            materials: cachedOrder.Materials || [],
            expenses: cachedOrder.Expenses || []
        }
    }
}

module.exports = OrderService;