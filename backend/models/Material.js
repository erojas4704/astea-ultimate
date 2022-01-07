const { Model } = require('sequelize');
const { extractValues } = require('../js/astea');

const materialKeys = {
    id: 'bpart_id',
    description: 'descr',
    vendor: 'model_id',
    class: 'pclass3_id',
    serialized: 'is_serialized',
    isInventory: 'is_inventory',
    searchKey: 'search_key'
}

class Material extends Model {
    static extractFromJSON(data) {
        const rawMaterialArray = data.root?.demand_material ?
            data.root.demand_material[0].row :
            data.root.row;
        if (!rawMaterialArray) return [];

        //TODO extract this to a similar thing like where we extract fields from Astea
        const materials = rawMaterialArray.map(material => extractValues(material, materialKeys));

        return materials;
    }

    /**Interprets an array of materials and adds them to the database. 
     * Interaction IDs are the order ID plus their indeces.*/
    static parse(materials) {
        //TODO rename all parse functions because they don't actually parse.
        materials.forEach(async (data) => {
            const id = data.id;
            try {
                await Material.findOrCreate({ where: { id: id }, defaults: { id, ...data } });
            }
            catch (err) {
                console.log(`Could not cache expense ${id}.`);
                console.log(err);
            }
        });
    }

    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            vendor: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            class: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            serialized: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            isInventory: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            searchKey: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
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