const { Model, DataTypes, Deferrable, Sequelize } = require('sequelize');
const Technician = require('./Technician');
const sequelize = new Sequelize(process.env.DATABASE_URL);
class Audit extends Model { }

Audit.init({
    name: { type: DataTypes.STRING, allowNull: false, },
    location: { type: DataTypes.STRING, allowNull: false },
    order_id: {type: DataTypes.STRING, allowNull: false},
    technician_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Technician,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    sequelize,
    modelName: "Audit"
});

module.exports = Audit;