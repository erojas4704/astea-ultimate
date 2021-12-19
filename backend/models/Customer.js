const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model { }

    Customer.init({
        id: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: { type: DataTypes.STRING, allowNull: false }
    }, {
        sequelize,
        modelName: "Customer"
    });

    return Customer;
}
