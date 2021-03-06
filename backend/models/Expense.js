const { Model, DataTypes } = require('sequelize');
const { extractValues } = require('../js/astea');
const Order = require('./Order');

const expenseKeys = {
    id: 'bpart_id',
    description: 'bpart_descr',
    price: 'price',
    cost: 'cost',
    orderId: 'order_id',
    quantity: 'qty',
    technicianId: 'sa_person_id',
    isBillable: {
        asteaKey: 'is_billable',
        value: (value) => value === 'Y'
    },
    isFulfilled: {
        asteaKey: 'is_fulfilled',
        value: (value) => value === 'Y'
    }
}

class Expense extends Model {
    static extractFromJSON(data) {//TODO make a generic method for parsing anything out of JSON.
        if(!data) return [];
        const rawExpenseArray = data?.root?.demand_expense ?
            data.root.demand_expense[0].row :
            data.root.row;

        if (!rawExpenseArray) return [];

        //TODO extract this to a similar thing like where we extract fields from Astea
        const expenses = rawExpenseArray.map(expense => extractValues(expense, expenseKeys));
        //console.log("Expenses", expenses);
        //Set demand attrs here?

        return expenses;
    }


    /**Interprets an array of expenses and adds them to the database. 
     * Interaction IDs are the order ID plus their indeces.*/
    static parse(expenses, orderId) {
        //TODO rename all parse functions because they don't actually parse.
        expenses.forEach(async (data) => {
            const id = data.id;
            try {
                const order = orderId ? await Order.findByPk(orderId) : null;
                const [expense] = await Expense.findOrCreate({ where: { id: id }, defaults: { id, ...data } });

                if (order) {
                    const orderExpenses = await order.getExpenses();
                    const orderExpense = orderExpenses.find(e => e.dataValues.id === id);

                    if (orderExpense) {
                        orderExpense.dataValues = data;
                    } else {
                        await order.addExpense(
                            expense,
                            { through: data }
                        ).catch(err => console.log(err));
                    }
                }
            } catch (err) {
                console.log(`Could not cache expense ${id}.`);
                console.log(err);
            }
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
        const OrderExpense = models.sequelize.define('OrderExpense', {
            quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
            isBillable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            isFulfilled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            isTaxable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            technicianId: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
            totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
        });
        models.Order.belongsToMany(models.Expense, { through: OrderExpense, as: 'expenses' });
        models.Expense.belongsToMany(models.Order, { through: OrderExpense, as: 'orders' });
    }

}

module.exports = Expense;