const { Model } = require('sequelize');
const { sanitizeData } = require('../helpers/serviceOrderParsing');

class Interaction extends Model {
    static extractFromJSON(data) {
        data = sanitizeData(data.root);
        if(!data.customer_authorization) return [];
        const rawInteractionArray = data.customer_authorization[0].row;
        if (!rawInteractionArray) return [];

        //TODO extract this to a similar thing like where we extract fields from Astea
        const interactions = rawInteractionArray.map(interaction => ({
            author: interaction.created_by_descr[0]._,
            date: new Date(`${interaction.creation_datetime[0]._}`),
            message: interaction.comment_text[0]._
        }));

        return interactions;
    }

    /**Interprets an array of interactions and adds them to the database. 
     * Interaction IDs are the order ID plus their indeces.*/
    static parse(interactions, order) {
        //TODO rename all parse functions because they don't actually parse.
        interactions.sort((a, b) => a.date - b.date);
        interactions.forEach(async (data, i) => {
            const id = `${order.id}-${i}`;
            await Interaction.findOrCreate({ where: { id: id }, defaults: { id, ...data } });
        });
    }

    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true }, //ID will be the same as the order ID with a line number next to it.
            message: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
            date: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        },
            { sequelize, modelName: 'Interaction' }
        );
    }

    static associate(models) {
        this.belongsTo(models.Technician, { foreignKey: 'technicianId', as: 'technician' });
        this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
        
        models.Order.hasMany(this, { foreignKey: 'orderId', as: 'interactions' });
    }

}

module.exports = Interaction;