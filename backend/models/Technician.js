const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
class Technician extends Model { }

Technician.init({
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    access_level: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
}, {
    sequelize,
    modelName: "Technician"
});

module.exports = Technician;