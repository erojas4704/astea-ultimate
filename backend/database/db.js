"use strict";
//TODO make this work against an actual database.
//For now, it just holds the database in memory.
class Database {
    static serviceOrders = {};

    static async getServiceOrder(id){
        return Database.serviceOrders[id];
    }

    static async setServiceOrder(id, order){
        Database.serviceOrders[id] = order;
    }
}

module.exports = Database;