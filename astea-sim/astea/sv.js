const fs = require('fs');
const util = require('util');
const { parseServiceOrderData } = require('../../backend/helpers/serviceOrderParsing');
const { parseXMLToJSON } = require('../helpers/xml');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const cacheDirectory = './.cache/ServiceOrders';
const rawDirectory = './.cache/Raw';

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

const getAllXMLServiceOrders = async () => {
    const svList = await readdir(rawDirectory);
    let promises = svList.map(async sv => {
        try {
            let data = await readFile(`${rawDirectory}/${sv}`, 'utf8',);
            const json = await parseXMLToJSON(data);
            return parseServiceOrderData(json.root.main[0].row[0]);
        } catch (e) {
            console.error(`Error parsing ${sv}`);
            return null;
        }
    });
    const results = await Promise.all(promises);
    const orders = {};
    results.forEach(result => {
        orders[result.id] = result;
    });

    return orders;
}

const getLocalServiceOrder = async id => {
    const data = await readFile(`${rawDirectory}/${id}.xml`, 'utf8',);
    return data;
}



module.exports = { getAllServiceOrders, getAllXMLServiceOrders, getLocalServiceOrder };