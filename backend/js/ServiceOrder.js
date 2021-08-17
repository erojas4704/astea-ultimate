const { parseServiceOrderData } = require("../helpers/serviceOrderParsing");

class ServiceOrder {
    constructor(data) {
        const svData = data; //data.main[0].row[0];
        const parsedData = ServiceOrder.parseServiceOrderJson(svData);

        this.mergeNewDataIntoServiceOrder(parsedData);
        this.createdAt = new Date();
    }

    static parseServiceOrderJson(svData) {
        return parseServiceOrderData(svData);
    }

    /**Using new raw data, we update any fields the data includes into this order.*/
    update(rawData) {
    }

    mergeNewDataIntoServiceOrder(data) {
        for (let key in data) {
            //If it's an object, merge those too
            if (this[key] && data[key] instanceof Object) {
                this[key] = { ...this[key], ...data[key] };
            } else {
                this[key] = data[key];
            }
        }
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
        data = data.root;
        const rawInteractionArray = data.customer_authorization[0].row;
        if (!rawInteractionArray) {
            this.interactions = [];
            return;
        };
        this.interactions = rawInteractionArray.map(interaction => {
            return {
                author: interaction.created_by_descr[0]._,
                date: new Date(`${interaction.actual_dt[0]._} ${interaction.actual_tm[0]._}`),
                message: interaction.comment_text[0]._
            }
        });
    }
}

module.exports = ServiceOrder;