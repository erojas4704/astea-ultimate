const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Customer = require('./Customer')(sequelize, Sequelize.DataTypes);
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const Technician = require('./Technician')(sequelize, Sequelize.DataTypes);
const Audit = require('./Audit')(sequelize, Sequelize.DataTypes);
const OrderAudit = require('./OrderAudit')(sequelize, Sequelize.DataTypes);




(async () => {
    await sequelize.sync({ force: true });
    console.log(Customer);
    Customer.create({
        id: 'erojas1',
        name: 'Eddie Rojas',
    });

    // Technician.create({
    //     id: 'erojas1',
    //     name: 'Eddie Rojas',
    //     access: 'admin',
    // })
})();
module.exports = sequelize;