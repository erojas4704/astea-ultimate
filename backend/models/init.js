
const Audit = require('./Audit');
const OrderAudit = require('./OrderAudit');
const Order = require('./Order');
const Technician = require('./Technician');

const { Sequelize } = require("sequelize/dist");
const init = async () => {
    const sequelize = new Sequelize(process.env.DATABASE_URL);
    await sequelize.sync({ force: true });
    Technician.sync({force: true});
    Audit.sync({force: true});
    OrderAudit.sync({force: true});
    Order.sync({force: true});
    
    console.log("Sync");
}

module.exports = init;