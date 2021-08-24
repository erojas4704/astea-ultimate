const Database = require("../database/db");
const { parseServiceOrderData, sanitizeData } = require("../helpers/serviceOrderParsing");
const Search = require("../helpers/search");

class ServiceOrder {
    constructor(data, completeness) {
        const svData = data; //data.main[0].row[0];
        const parsedData = ServiceOrder.parseServiceOrderJson(svData);

        this.completeness = completeness;
        this.mergeNewDataIntoServiceOrder(parsedData);
        this.createdAt = new Date();
    }

    static parseServiceOrderJson(svData) {
        return parseServiceOrderData(svData);
    }

    /**Checks the database for an existing work order, if it doesn't exist.
     * If it does exist, it returns the existing work order.
     * If it doesn't exist, it creates a new work order and returns it.
     * data: Raw data from the service order.
     * completeness: How complete the data is. Data is considered complete if it contains all the necessary fields. 
     * Order with a higher completion factor will overwrite an existing order.
    */
    static async retrieve(data, completeness) { //TODO examine this function and document how it works.
        const id = data.order_id[0]._;
        const current = await Database.getServiceOrder(id);
        if (current && completeness > current.completeness) {
            current.completeness = completeness;
            const parsedData = ServiceOrder.parseServiceOrderJson(data);
            //TODO this code is duplicated in the constructor.
    
            this.completeness = completeness;
            current.mergeNewDataIntoServiceOrder(parsedData, true);
            return current;
        } else {
            return new ServiceOrder(data, completeness);
        }
    }

    calculateCompleteness() {
        let completeness = 0;
        if(this.actionGroup || this.warehouse || this.status) completeness ++; //Gotten from a search engine
        if(this.problem.length > 60 || this.metadata) completeness ++; //retrieved properly
        if(this.interactions) completeness ++;
        if(this.materials) completeness ++;
        this.completeness = completeness;
    }

    /**Using new raw data, we update any fields the data includes into this order.*/
    update(rawData) {
    }

    mergeNewDataIntoServiceOrder(data, overwrite) {
        for (let key in data) {
            if (this[key] && !overwrite) continue; //Skip if we're not overwriting and the key already exists


            //If it's an object, merge those too
            if (this[key] && data[key] instanceof Object) {
                this[key] = { ...this[key], ...data[key] };
            } else {
                this[key] = data[key];
            }
        }

        Search.markDirty(this);
    }

    parseMaterials(data) {
        data = data.root;
        const rawMaterialArray = data.demand_material[0].row;
        if (!rawMaterialArray) {
            this.materials = [];
            return;
        }

        this.materials = rawMaterialArray.map(material => {
            return {
                id: material.bpart_id[0]._,
                name: material.bpart_descr[0]._,
                warehouse: material.fr_warehouse_id[0]._,
                vendor: material.vendor_id[0]._,
                sourceDocument: material.cc_orig_doc_id[0]._
            }
        });
    }

    parseInteractions(data) {
        data = sanitizeData(data.root);

        const rawInteractionArray = data.customer_authorization[0].row;
        if (!rawInteractionArray) {
            this.interactions = [];
            return;
        };
        this.interactions = rawInteractionArray.map(interaction => {
            return {
                author: interaction.created_by_descr[0]._,
                date: new Date(`${interaction.creation_datetime[0]._}`),
                message: interaction.comment_text[0]._
            }
        });
    }

    getAgeInMinutes() {
        return Math.floor((new Date() - new Date(this.createdAt)) / 60000);
    }
}

module.exports = ServiceOrder;