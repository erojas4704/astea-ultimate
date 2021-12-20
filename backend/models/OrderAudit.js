const { Model, Deferrable } = require('sequelize');
const Audit = require('./Audit');


class OrderAudit extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            location: { type: DataTypes.STRING, allowNull: false },
            order_id: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.INTEGER, defaultValue: 0 },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Audit,
                    key: 'name',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
            }
        }, {
            sequelize,
            modelName: "OrderAudit"
        });
    }
}

module.exports = OrderAudit;