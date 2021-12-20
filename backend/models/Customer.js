const { Model } = require('sequelize');


class Customer extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            name: { type: DataTypes.STRING, allowNull: false }
        }, {
            sequelize,
            modelName: "Customer"
        });
    }
}

module.exports = Customer;