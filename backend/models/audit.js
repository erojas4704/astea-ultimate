const { Model, DataTypes, Deferrable, Sequelize } = require('sequelize');
const Order = require('./Order');
const sequelize = new Sequelize(process.env.DATABASE_URL);
class Audit extends Model { }

Audit.init({
    name: { type: DataTypes.STRING, allowNull: false, },
    date: { type: DataTypes.DATE, allowNull: false },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Order,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    sequelize,
    modelName: "Audit"
});

module.exports = Audit;