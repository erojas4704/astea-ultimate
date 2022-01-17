const { Model, DataTypes } = require('sequelize');
const { extractValues } = require('../js/astea');
const Order = require('./Order');

const materialKeys = {
    id: 'bpart_id',
    description: 'descr',
    vendor: 'model_id',
    class: 'pclass3_id',
    serialized: 'is_serialized',
    isInventory: 'is_inventory',
    searchKey: 'search_key',

    document: 'cc_orig_doc_id',
    quantity: 'qty',
    cost: 'cost',
    price: 'cc_price',
    totalPrice: 'cc_total_price',
    warehouse: 'fr_warehouse_id',
    origin: 'cc_orig_doc_id',
    isBillable: {
        asteaKey: 'is_billable',
        value: (value) => value === 'Y'
    },
    isFulfilled: {
        asteaKey: 'is_fulfilled',
        value: (value) => value === 'Y'
    }
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
     static parse(materials, orderId) {
        //TODO rename all parse functions because they don't actually parse.
        materials.forEach(async (data) => {
            const id = data.id;
            try {
                const order = orderId ? await Order.findByPk(orderId, {include: Material}) : null;
                const [material] = await Material.findOrCreate({ where: { id: id }, defaults: { id, ...data } });

                if (order) {
                    const orderMaterials = await order.getMaterials();
                    const orderMaterial = orderMaterials.find(e => e.dataValues.id === id);

                    if (orderMaterial) {
                        orderMaterial.dataValues = data;
                    } else {
                        await order.addMaterial(
                            material,
                            { through: data }
                        ).catch(err => console.log(err));
                    }
                }
            } catch (err) {
                console.log(`Could not cache material ${id}.`);
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
        const OrderMaterial = models.sequelize.define('OrderMaterial', {
            quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
            isBillable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            isFulfilled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            isTaxable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            technicianId: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            origin: { type: DataTypes.STRING, allowNull: false, defaultValue: 0 }
        });

        models.Order.belongsToMany(models.Material, { through: OrderMaterial, as: 'materials' });
        models.Material.belongsToMany(models.Order, { through: OrderMaterial, as: 'orders' });
        this.belongsToMany(models.PurchaseRequisition, { through: 'PurchaseRequisitionMaterial' });
    }

}

module.exports = Material;