
const prompt = require("prompt");
const { Order, Customer, Technician } = require("../backend/models/Database");
const { sequelize } = require("../backend/models/Database");
const axios = require("axios");

console.log("***SEEDER***");
prompt.start();
sequelize.sync({ force: true });

(async () => {
    const { numTechnicians, numCustomers, numOrders } = await prompt.get([
        {
            description: "Number of technicians",
            default: 5,
            pattern: /\d+/,
            name: "numTechnicians"
        },
        {
            description: "Number of customers",
            default: 25,
            pattern: /\d+/,
            name: "numCustomers"
        },
        {
            description: "Number of orders",
            default: 300,
            pattern: /\d+/,
            name: "numOrders"
        },
    ]);

    const { confirm } = await prompt.get([
        { description: "Are you sure you want to do this? This is highly destructive operation will delete your cached Astea database! (Y / N)", name: "confirm", pattern: /y|n/i }
    ]);

    if (confirm !== "y") process.exit(1);
    await sequelize.sync({ force: true });

    const technicians = [];
    const customerPromises = [];

    for (let i = 0; i < numTechnicians; i++) {
        const tech = (await axios.get("https://api.namefake.com/")).data;
        const id = (tech.name[0] + tech.name.split(" ")[1]).toLowerCase();
        technicians.push({
            id,
            name: tech.name
        });
    }

    for (let i = 0; i < numCustomers; i++) {
        customerPromises.push(axios.get("https://api.namefake.com/"));
    }
    technicians.forEach(async cust => {
        await Technician.create(cust);
    });

    const customersResponse = await Promise.all(customerPromises);
    const customers = customersResponse.map((resp, i) => {
        const cust = resp.data;
        const id = `CUST${addLeadingZeros(i, 10)}`;
        const name = parseName(cust.name);
        const address = cust.address;
        const phone = cust.phone_h;
        return ({
            id,
            name,
            address,
            phone
        });
    })
    customers.forEach(async cust => {
        await Customer.create(cust).catch(err => {
            console.log(err);
        });
    });

    for (let i = 0; i < numOrders; i++) {
        const orderId = `SV${addLeadingZeros(i, 10)}@@0`;
        const requestId = `SV${addLeadingZeros(i, 10)}`;
        const order = await Order.create({
            id: orderId,
            requestId,
            customerId: customers[Math.floor(Math.random() * customers.length)].id,
            technicianId: technicians[Math.floor(Math.random() * technicians.length)].id,
            status: "Fake",
            statusId: -1,
            description: "This order is a fake.",
            actionGroup: "QNTech",
            isInHistory: Math.random() > 0.5,
            openDate: new Date()
        }).catch(err => {
            console.log(err);
            process.exit(1);
        })
    }

    console.log(technicians, customers);
})();

function parseName(name) {
    const parts = name.split(" ");
    if (parts.length <= 2) return name;

    const expression = /\D+\.|[^a-z]*/
    if (expression.exec(parts[0])) {
        parts.shift();
    }
    if (expression.exec(parts[parts.length - 1]))
        parts.pop();

    return parts.join(" ");
}

function addLeadingZeros(num, size = 2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}