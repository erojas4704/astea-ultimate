const { Model, Deferrable } = require('sequelize');
const Technician = require('./Technician');

class Audit extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
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
    }
}
module.exports = Audit;