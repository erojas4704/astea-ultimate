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
        //TODO function needs serious refactoring
        const query = {
            where: {
                [Op.or]: [],
                [Op.and]: []
            }
        }

        const comparators = {
            isInHistory: Op.is,
            statusId: Op.eq
        }


        const ignoreKeys = [
            "createdAt",
            "updatedAt",
            "openDate",
            "statusId"
        ];
        if(criteria.inHistory){
            criteria.isInHistory = criteria.inHistory === "true";
            delete criteria.inHistory;
        }else{
            ignoreKeys.push("isInHistory");
        }
        
        const additionalKeys = [
            "customerName",
            "technicianName"
        ];

        const columnsToSearchFor = criteria.all ?
            [...additionalKeys, ...Object.keys(Order.rawAttributes).filter(key => !ignoreKeys.includes(key))] :
            Object.keys(criteria);

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
                customers.forEach(c => {
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
//console.log(key, criteria[key], criteria.all);

            if (criteria[key]) {
                query.where[Op.and].push({
                    [key]: {
                        [Op.iLike]: `%${criteria[key]}%`
                    }
                });
            }else if (criteria.all) {
                query.where[Op.or].push({
                    [key]: {
                        [Op.iLike]: `%${criteria.all}%`
                    }
                });
            } 
        });

        // console.log(JSON.stringify(query.where), criteria);
        // console.log(JSON.stringify(query), criteria);
        // console.log(JSON.stringify(query), criteria);
        //TODO search needs deep optimization. We can't just do a search for every single column as our database grows in complexity.

        const orders = await Order.findAll({
            ...query,
            include: [
                { model: Customer, as: 'customer' },
                { model: Technician, as: 'technician' }
            ],
            order: [
                ['id', 'DESC']
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