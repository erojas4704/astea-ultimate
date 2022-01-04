require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
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

    // for (let i = 4; i < 200; i++) {
    //     await Material.create({
    //         id: 'TM-' + i.toFixed(0).padStart(3, '0'),
    //         vendor: "Homebrew",
    //         description: "Test Material generic.",
    //         class: "Test",
    //         serialized: false,
    //         isInventory: true,
    //         searchKey: i.toFixed(0).padStart(3, '0')
    //     });
    // }
    await sequelize.sync({ alter: true }).catch(err => console.log(err));
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