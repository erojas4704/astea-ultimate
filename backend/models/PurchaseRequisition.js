const { Model } = require('sequelize');

class PurchaseRequisition extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            reference: { type: DataTypes.STRING },
            vendorRMA: { type: DataTypes.STRING },
            buyer: { type: DataTypes.STRING },
            originalDocument: { type: DataTypes.STRING }
        },
            { sequelize, modelName: 'PurchaseRequisition' }
        );
    }

    static associate(models) {
        //Can have any number of products
    }

}

module.exports = PurchaseRequisition;