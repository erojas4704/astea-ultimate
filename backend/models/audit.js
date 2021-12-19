const { Model, Deferrable } = require('sequelize');
const Technician = require('./Technician');

module.exports = (sequelize, DataTypes) => {
    class Audit extends Model { }
    Audit.init({
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
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

    return Audit;
}