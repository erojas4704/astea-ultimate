const { Model, DataTypes } = require('sequelize');
const { extractValues } = require('../js/astea');

const expenseKeys = {
    id: 'bpart_id',
    description: 'bpart_descr',
    price: 'price'
}

class Expense extends Model {
    static extractFromJSON(data) {//TODO make a generic method for parsing anything out of JSON.
        const rawExpenseArray = data.root?.demand_expense ?
            data.root.demand_expense[0].row :
            data.root.row;
            
        if (!rawExpenseArray) return [];

        //TODO extract this to a similar thing like where we extract fields from Astea
        const expenses = rawExpenseArray.map(expense => extractValues(expense, expenseKeys));
        //Set demand attrs here?

        return expenses;
    }
    

    /**Interprets an array of expenses and adds them to the database. 
     * Interaction IDs are the order ID plus their indeces.*/
    static parse(expenses) {
        //TODO rename all parse functions because they don't actually parse.
        expenses.forEach(async (data) => {
            const id = data.id;
            await Expense.findOrCreate({ where: { id: id }, defaults: { id, ...data } });
        });
    }

    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
        },
            { sequelize, modelName: 'Expense' }
        );
    }

    static associate(models) {
        //TODO is this even viable?
        const OrderDemand = models.sequelize.define('OrderDemand', {
            quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            isBillable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            isFulfilled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            isTaxable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            technicianId: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
        });
        this.belongsToMany(models.Order, { through: OrderDemand });
    }

}

module.exports = Expense;