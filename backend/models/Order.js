const { Model, DataTypes } = require('sequelize');
class Order extends Model { }

Order.init({
    id: {type: DataTypes.STRING, primaryKey: true, unique: true},
    open_date: {type: DataTypes.DATE, allowNull: false},
    technician_id: {type: DataTypes.STRING}
})