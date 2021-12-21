
const fs = require("fs").promises;
const DATA_URL = "./.cache/";
//TODO make this work against an actual database.
//For now, it just holds the database in the filesystem.
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

    static async dropServiceOrder(id) {
        delete Database.serviceOrders[id];
    }
}

module.exports = Database;