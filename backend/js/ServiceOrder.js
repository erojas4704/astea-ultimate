const { parseServiceOrderData } = require("../helpers/serviceOrderParsing");

class ServiceOrder {
    constructor(data) {
        data = data.root;
        if (Number(data.$.totalRows) > 1) {
            throw new Error(`Service Order data has more than one record`);
        }
        const svData = data.main[0].row[0];
        const parsedData = ServiceOrder.parseServiceOrderJson(svData);

        ServiceOrder.mergeNewDataIntoServiceOrder(this, parsedData);
        this.createdAt = new Date();
    }

    static parseServiceOrderJson(svData) {
        return parseServiceOrderData(svData);
        return {
            id: svData.order_id[0]._,
            requestID: svData.request_id[0]._,
            type: svData.callt_id[0]._,
            actionGroup: svData.cc_actgr_descr[0]._,
            status: svData.order_stat_descr[0]._,
            statusID: svData.order_stat_uniq_id[0]._,
            problem: svData.problem_desc[0]._,
            product: svData.prod_descr[0]._,
            serialNumber: svData.serial_no[0]._,
            openDate: new Date(svData.open_date[0]._),
            customer: {
                name: svData.cc_cust_company_descr[0]._,
                id: svData.cust_company_id[0]._
            },
            warehouse: svData.warehouse_id[0]._,
            caller: {
                id: svData.caller_person_id[0]._,
                name: svData.caller_name[0]._
            },
            technician: {
                id: svData.sa_person_id[0]._,
                name: svData.cc_sa_descr[0]._
            }
        }
    }

    /**Using new raw data, we update any fields the data includes into this order.*/
    update(rawData) {
    }

    static mergeNewDataIntoServiceOrder(serviceOrder, data) {
        serviceOrder = { ...serviceOrder, ...data };
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