const { Model } = require('sequelize');
const { parseServiceOrderData } = require('../helpers/serviceOrderParsing');
const Customer = require('./Customer');
const Technician = require('./Technician');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Dynamically parses Astea data and returns a service order object, while caching it in the database.
         * @param {Object} data
         * @returns {Order} A service order object
         */
        static parse(data) {
            const order = Order.build({ ...parseServiceOrderData(data) });
            return order;
        }

        static associate(models) {
            Order.hasOne(Technician, { foreignKey: 'id' });
            Technician.belongsTo(Order);

            Order.hasOne(Customer);
            Customer.belongsTo(Order);
        }
    }

    Order.init({
        id: { type: DataTypes.STRING, primaryKey: true, unique: true },
        openDate: { type: DataTypes.DATE, allowNull: false },
        isInHistory: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        serialNumber: { type: DataTypes.STRING, allowNull: true },
        statusId: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        /*technicianId: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Technician,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },*/
        description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    }, {
        sequelize,
        modelName: "Order"
    });


    return Order;
}


// Order.sync({ force: true }).catch(err => console.error(err));