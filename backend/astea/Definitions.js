class Definitions {
    static searchKeys = {
        "openDate": "order_line.open_date",
        "openDateFrom": "order_line.open_date",
        "openDateTo": "order_line.open_date",
        "actionGroup": "actgr.descr",
        "id": "order_line.request_id",
        "name": "order_line.cust_company_descr",
        "tag": "tagno",
        "serial": "serial_no",
        "technicianName": "person.search_name",
        "technicianID": "service_call.sa_person_id",
        "inHistory": "order_line.is_in_history",
        "status": "order_line.order_stat_uniq_id",
    }

    static secondarySearchKeys = {
        "id": "c_order_line.request_id",
        "openDate": "c_order_line.open_date",
        "openDateFrom": "c_order_line.open_date",
        "openDateTo": "c_order_line.open_date",
        "name": "c_order_line.cust_company_descr",
        "technicianID": "c_service_call.sa_person_id",
        "inHistory": "c_order_line.is_in_history",
        "status": "c_order_line.order_stat_uniq_id",
    }

    static translateToAsteaKey(key, useSecondary = false) {
        if (useSecondary && this.secondarySearchKeys[key]) {
            return this.secondarySearchKeys[key];
        }
    
        if (!this.searchKeys[key]) throw new Error(`Could not find Astea search key for '${key}'`);
    
        return this.searchKeys[key];
    }
}

module.exports = Definitions;