"use strict";
const fs = require("fs").promises;
const ServiceOrder = require("../js/serviceOrder");
const DATA_URL = "./.cache/";
//TODO make this work against an actual database.
//For now, it just holds the database in memory.
class Database {
    static serviceOrders = {};
    static searches = {};

    static async getSearch(id) {
        return Database.searches[id];
    }

    static async setSearch(id, search) {
        Database.searches[id] = search;
    }

    static async dropSearch(id) {
        delete Database.searches[id];
    }

    static async getServiceOrder(id) {
        const data = await fs.readFile(`${DATA_URL}/ServiceOrders/${id}.sv`, "utf8")
            .catch(err => console.log(err)); //Fail silently
    
        if(!data) return;
        const obj = JSON.parse(data);
        let sv = Object.assign(new ServiceOrder, obj)
        //console.log("Found new SV ", sv);
        return sv;
        //TODO clean when it works
        //return Database.serviceOrders[id];
    }

    static async setServiceOrder(id, order) {
        await fs.writeFile(`${DATA_URL}/ServiceOrders/${id}.sv`, JSON.stringify(order), {flag: 'w'})
            .catch(err => console.error(err)); //Fail silently
        //Database.serviceOrders[id] = order;

    }

    static async dropServiceOrder(id) {
        delete Database.serviceOrders[id];
    }
}

module.exports = Database;