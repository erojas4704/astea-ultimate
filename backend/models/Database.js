require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: true
});

const Customer = require('./Customer');
const Order = require('./Order');
const Technician = require('./Technician');

const Audit = require('./Audit');
const OrderAudit = require('./OrderAudit');
const Interaction = require('./Interaction');
const PurchaseRequisition = require('./PurchaseRequisition');
const Material = require('./Material');
const Expense = require('./Expense');

const models = {
    sequelize,
    Customer: Customer.init(sequelize, Sequelize),
    Order: Order.init(sequelize, Sequelize),
    Technician: Technician.init(sequelize, Sequelize),
    Audit: Audit.init(sequelize, Sequelize),
    OrderAudit: OrderAudit.init(sequelize, Sequelize),
    Interaction: Interaction.init(sequelize, Sequelize),
    PurchaseRequisition: PurchaseRequisition.init(sequelize, Sequelize),
    Material: Material.init(sequelize, Sequelize),
    Expense: Expense.init(sequelize, Sequelize)
}

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

(async () => {
    //await sequelize.sync({ alter: true }).catch(err => console.log(err));
    // const allInteractions = await Interaction.findAll()
    // .catch(err => console.log(err))
    // console.log(allInteractions);
    // allInteractions.forEach(interaction => {
    //     const [orderId] = interaction.id.split('-');
    //     interaction.orderId = orderId;
    //     interaction.technicianId = ['erojas1', 'sinqshiqaq', 'tadams1', 'asantisteban', 'achiarelli', 'pflaherty', 'gmanolas'][Math.floor(Math.random() * 7)];
    //     interaction.save().then(() => console.log(`Saved interaction ${interaction.id}`))
    //     .catch(err => console.log(err))
    // })
    //
    //Order.sync({alter: true});
    // await sequelize.sync({ force: true })
    //     .then(() => console.log('Database synced'))
    //     .catch(err => console.error(err));
    // Customer.create({
    //     id: 'erojas1',
    //     name: 'Eddie Rojas',
    // });

    // Technician.create({
    //     id: 'erojas1',
    //     name: 'Eddie Rojas',
    //     access: 'admin',
    // }).catch(err => console.log(err));
    // Order.build({
    //     id: 'SV0123@@1', 
    //     requestId: 'SV123',
    //     openDate: new Date(),
    //     isInHistory: false,
    //     serialNumber: 'SV0123',
    //     statusId: 1,
    //     status: 'Open',
    //     problem: 'Broken'
    // })
})();


module.exports = {
    ...models, sequelize
};