//TODO if a new search lines up with a previous search, mark previous search as dirty.
const hash = require("object-hash");
const Database = require("../database/db");
require("dotenv").config();
const SEARCHES_EXPIRE_IN_MINUTES = process.env.SEARCHES_EXPIRE_IN_MINUTES || 20;

class Search {
    static masterList = {};

    static async get(query) {
        let key = hash(query);
        const search = await Database.getSearch(key);

        if (!search) return;
        //if (search) console.log("FOUND SEARCH ", search, key);
        //else return;

        if (search.dirty || search.getAgeInMinutes() < SEARCHES_EXPIRE_IN_MINUTES) {  //Check if search is expired
            Database.dropSearch(key);
            return;
        }

        return search;
    }

    static async create(query, results) {
        const search = new Search(query, results);
        Search.addToMasterList(search);
        Database.setSearch(search.key, search);
        return search;
    }

    static addToMasterList(search) {
        search.results.forEach(sv => {
            if (Search.masterList[sv.id]) {
                Search.masterList[sv.id].add(search.key);
            } else {
                Search.masterList[sv.id] = new Set(search.key);
            }
        });
    }

    static markDirty(sv) {
        if (Search.masterList[sv.id]) {
            Search.masterList[sv.id].forEach(search => {
                search.dirty = true;
            });
        }
    }

    constructor(query, results) {
        this.key = hash(query);
        this.query = query;
        this.results = results;
        this.createdAt = new Date();

        console.log(`Saving search ${this.key} with criteria `, query);
    }

    getAgeInMinutes() {
        return Math.floor((new Date() - new Date(this.createdAt)) / 60000);
    }
}

module.exports = Search;