const { Model, DataTypes } = require('sequelize');
class Audit extends Model { }

Audit.init({
    name: {type: DataTypes.STRING, allowNull: false,},
    date: {type: DataTypes.DATE, allowNull: false},
    order_id: {
        type: DataTypes.STRING, 
        allowNull: false,
        references:{

        }
    }
}, { sequelize, modelName: 'audit' });

module.exports = Audit;