const { Model } = require('sequelize');
const { parseServiceOrderData } = require('../helpers/serviceOrderParsing');
const Customer = require('./Customer');
const Technician = require('./Technician');

class Order extends Model {
    /**
     * Dynamically parses Astea data and returns a service order object, while caching it in the database.
     * This function retrieves customer data on the order and caches it as well.
     * @param {Object} data
     * @returns {Object} A read-only service order object
     */
    static async parse(data) {
        const orderData = parseServiceOrderData(data);
        const { customer, technician } = orderData;

        (async () => {
            const [o] = await Order.findOrCreate({ where: { id: orderData.id }, defaults: orderData });
            o.set(orderData);
            if (customer && customer.id) {
                const [cust] = customer?.id ? await Customer.findOrCreate({ where: { id: customer.id }, defaults: customer }) : null;
                o.setCustomer(cust);
            }
            if (technician && technician.id) {
                const [tech] = technician?.id ? await Technician.findOrCreate({ where: { id: technician.id }, defaults: technician }) : null;
                o.setTechnician(tech);
            }
            //TODO extract and organize so that the promises run in parallel.
            //TODO collapse these into one call as well.

            o.save();//.catch(err => console.error(err));
        })();

        return orderData;
    }

    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            requestId: { type: DataTypes.STRING, allowNull: false },
            openDate: { type: DataTypes.DATE, allowNull: false },
            isInHistory: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            serialNumber: { type: DataTypes.STRING, allowNull: true },
            statusId: { type: DataTypes.INTEGER, allowNull: false },
            status: { type: DataTypes.STRING, allowNull: false },
            problem: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
            warehouse: { type: DataTypes.STRING, allowNull: true },
            actionGroup: { type: DataTypes.STRING, allowNull: true },
            tag: { type: DataTypes.STRING, allowNull: true }
        },
            { sequelize, modelName: 'Order' }
        );
    }

    static associate(models) {
        this.belongsTo(models.Technician);
        this.belongsTo(models.Customer);
        models.Customer.hasMany(this, { as: 'orders' });
        models.Technician.hasMany(this, { as: 'orders' });
    }
}

module.exports = Order;