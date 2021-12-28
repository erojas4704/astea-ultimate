const { Model } = require('sequelize');

class Material extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
        },
            { sequelize, modelName: 'Material' }
        );
    }

    static associate(models) {
        //Any order can have any number of products
        //Any purchase requisition can have any number of products
        this.belongsToMany(models.Order, { through: 'OrderMaterial' });
        this.belongsToMany(models.PurchaseRequisition, { through: 'PurchaseRequisitionMaterial' });
    }

}

module.exports = Material;