const { Model, Deferrable } = require('sequelize');
const Audit = require('./Audit');


module.exports = (sequelize, DataTypes) => {
    class OrderAudit extends Model { }
    OrderAudit.init({
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
    
    return OrderAudit;
}