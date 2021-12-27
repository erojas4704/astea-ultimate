const { Model } = require('sequelize');

class Product extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
        },
            { sequelize, modelName: 'Product' }
        );
    }

    static associate(models) {
        //Any order can have any number of products
        //Any purchase requisition can have any number of products
        this.belongsToMany(models.Order, { through: 'OrderProduct' });
        this.belongsToMany(models.PurchaseRequisition, { through: 'PurchaseRequisitionProduct' });
    }

}

module.exports = Product;