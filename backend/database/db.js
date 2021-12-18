
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

    static async getServiceOrder(id) {
        const path = `${DATA_URL}/ServiceOrders/${id}.sv`;
        const data = await fs.readFile(path, "utf8")
            .catch(err => console.log(err)); //Fail silently

        if (!data) return;
        try {
            const obj = JSON.parse(data);
            return obj;
        } catch (err) {
            console.log(`Data for service order [${id}] is corrupt. Discarding`);
            fs.unlink(path, err => {
                if (err) {
                    console.error(err);
                }
            });
        }
        
        //TODO clean when it works
        //return Database.serviceOrders[id];
    }

    static async setServiceOrder(id, order) {
        await fs.writeFile(`${DATA_URL}/ServiceOrders/${id}.sv`, JSON.stringify(order), { flag: 'w' })
            .catch(err => console.error(err)); //Fail silently
        //Database.serviceOrders[id] = order;

    }

    static async dropServiceOrder(id) {
        delete Database.serviceOrders[id];
    }
}

module.exports = Database;