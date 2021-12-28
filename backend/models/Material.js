const { Model } = require('sequelize');

class Material extends Model {
    static extractFromJSON(data) {
        const rawMaterialArray = data.root.row;

        //TODO extract this to a similar thing like where we extract fields from Astea
        const materials = rawMaterialArray.map(material => ({
            id: material.bpart_id[0]._,
            description: material.descr[0]._,
            vendor: material.model_id[0]._,
            class: material.pclass3_id[0]._,
            serialized: material.is_serialized[0]._,
            isInventory: material.is_inventory[0]._,
            searchKey: material.search_key[0]._
        }));

        return materials;
    }

    /**Interprets an array of materials and adds them to the database. 
     * Interaction IDs are the order ID plus their indeces.*/
    static parse(materials) {
        //TODO rename all parse functions because they don't actually parse.
        materials.forEach(async (data) => {
            const id = data.id;
            const material = await Material.findOrCreate({ where: { id: id }, defaults: { id, ...data } });
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