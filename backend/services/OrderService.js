const { query } = require("express");
const { Op } = require("sequelize/dist");
const { processAllKey, extractCriteria } = require("../helpers/querying");
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
        const cachedOrder = await Order.findOne({
            where: { id: id },
            include: [
                { model: Expense, as: "expenses" },
                { model: Material, as: "materials" },
                { model: Interaction, as: "interactions" },
                { model: Customer, as: "customer" },
            ],
            order: [
                [{ model: Interaction, as: 'interactions' }, 'date', 'DESC']
            ]
        });

        if (!cachedOrder) throw new AsteaError("Astea Error", 404, "Order not found");
        return { serviceOrder: cachedOrder.dataValues }
    }

    /**
     * Looks up a service order in our local database. 
     * @param {Object} criteria with several keys to look for.
     * @returns 
     */
    static async search(criteria) {
        if(criteria.all) criteria = processAllKey(criteria.all);
        console.log(processAllKey(criteria.all));
        console.log(criteria);
        
        //Splat all key
        delete criteria.all;
        const criteriaKeys = Object.keys(criteria);


        const query = {
            where: {
                [Op.and]: criteriaKeys.map(key => {
                    return {
                        [key]: extractCriteria(criteria, key)
                    }
                })
            }
        }

        const orders = await Order.findAll({
            ...query,
            include: [
                { model: Customer, as: "customer" },
                { model: Technician, as: "technician" }
            ],
            order: [
                ['id', 'DESC']
            ]
        }).catch(err => {
            console.log("Could not run local order search. ", err);
        })

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
                model: Technician,
                as: "technician"
            },
            order: [['id', 'DESC']]
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
                { model: Expense, as: "expenses" },
                { model: Material, as: "materials" },
                { model: Interaction, as: "interactions" }
            ],
            order: [
                [{ model: Interaction, as: 'interactions' }, 'date', 'DESC']
            ]
        });

        if(!cachedOrder) throw new AsteaError("Astea Error", 404, "Order not found");

        //const interactions = await cachedOrder.getInteractions() || [];

        return {
            interactions: cachedOrder.interactions,
            materials: cachedOrder.Materials,
            expenses: cachedOrder.Expenses
        }
    }
}

module.exports = OrderService;