const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const cacheDirectory = './.cache/ServiceOrders';

const getAllServiceOrders = async () => {
    const svList = await readdir(cacheDirectory);
    let promises = svList.map(async sv => {
        let data = await readFile(`${cacheDirectory}/${sv}`, 'utf8',);
        return JSON.parse(data);
    });
    const results = await Promise.all(promises);
    const orders = {};
    results.forEach(result => {
        orders[result.id] = result;
    });

    return orders;
}

module.exports = { getAllServiceOrders };