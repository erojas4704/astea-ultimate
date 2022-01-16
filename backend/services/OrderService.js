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

    /**
     * Looks up a service order in our local database. 
     * @param {Object} criteria with several keys to look for.
     * @returns 
     */
    static async search(criteria) {
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
        ];

        const columnsToSearchFor = criteria.all ?
            [...additionalKeys, ...Object.keys(Order.rawAttributes).filter(key => !ignoreKeys.includes(key))] :
            criteria;

        let ordersPrecache = [];

        columnsToSearchFor.forEach(async key => {
            //TODO this is a nasty hack until I learn more about our ORM.
            if (key === "customerName") {
                const customers = await Customer.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${criteria[key] || criteria.all}%`
                        }
                    },
                    include: [
                        {
                            model: Order, as: 'orders', include: [
                                { model: Technician, as: 'technician' },
                                { model: Customer, as: 'customer' },
                            ]
                        }
                    ]
                });

                let customerOrders = [];
                customers.forEach( c => {
                    customerOrders.push(...c.orders);
                });

                ordersPrecache = [...ordersPrecache, ...customers.reduce((acc, customer) => [...acc, ...customer.orders], [])];
            } else if (key === "technicianName") {
                const technicians = await Technician.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${criteria[key] || criteria.all}%`
                        }
                    },
                    include: [
                        //God this is hideous
                        {
                            model: Order, as: 'orders', include: [
                                { model: Technician, as: 'technician' },
                                { model: Customer, as: 'customer' },
                            ]
                        }
                    ]
                });
                ordersPrecache = [...ordersPrecache, ...technicians.reduce((acc, technician) => [...acc, ...technician.orders], [])];
                //TODO these precached orders need 
            }

            query.where[Op.or].push({
                [key]: {
                    [Op.iLike]: `%${criteria[key] || criteria.all}%`
                }
            });
        });
        //TODO search needs deep optimization. We can't just do a search for every single column as our database grows in complexity.

        const orders = await Order.findAll({
            ...query,
            include: [
                { model: Customer, as: 'customer' },
                { model: Technician, as: 'technician' }
            ]
        }).catch(err => console.log(`Error running search. ${err}`));
        
        return [...orders, ...ordersPrecache];
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