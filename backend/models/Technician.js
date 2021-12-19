const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Technician extends Model { }
    Technician.init({
        id: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        access: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
    }, {
        sequelize,
        modelName: "Technician"
    });

    return Technician;
}