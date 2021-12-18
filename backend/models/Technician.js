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

/*
Technician.create({
    id: 'erojas1',
    name: 'Eddie Rojas',
    access_level: 'admin'
});
*/

module.exports = Technician;