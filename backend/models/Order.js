const { Model, DataTypes, Deferrable, Sequelize } = require('sequelize');
const { parseServiceOrderData } = require('../helpers/serviceOrderParsing');
const Technician = require('./Technician');
const sequelize = new Sequelize(process.env.DATABASE_URL);

class Order extends Model {
    /**
     * Dynamically parses Astea data and returns a service order object.
     * @param {Object} data
     * @returns {Order} A service order object
     */
    static parse(data) {
        return Order.build(...parseServiceOrderData(data));
    }
}

Order.init({
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    open_date: { type: DataTypes.DATE, allowNull: false },
    is_in_history: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    serial_number: { type: DataTypes.STRING, allowNull: true },
    status_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    technician_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Technician,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
}, {
    sequelize,
    modelName: "Order"
});

module.exports = Order;