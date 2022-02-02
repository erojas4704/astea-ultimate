const { Model } = require('sequelize');


class Customer extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            name: { type: DataTypes.STRING, allowNull: false },
            phone: { type: DataTypes.STRING, allowNull: true },
            email: { type: DataTypes.STRING, allowNull: true },
        }, {
            sequelize,
            modelName: "Customer"
        });
    }
}

module.exports = Customer;