const fields = {
    "order_id": "id",
    "request_id": "requestID",
    "problem_desc": "problem",
    "desc": "problem",
    "order_stat_descr": "status",
    "order_stat_uniq_id": "statusID",
    "prod_descr": "product",
    "serial_no": "serialNumber",
    "open_date": "openDate",
    "warehouse_id": "warehouse",
    "order_type_id": "orderType",
    "actgr_descr": "actionGroup",
    "cc_actgr_descr": "actionGroup",
    "is_in_history": "isInHistory",
    "cc_cust_company_descr": "customer.name",
    "cc_cust_company_id": "customer.id",
    "cc_site_company_descr": "customer.name",
    "company_descr": "customer.name",
    "cust_id": "customer.id",
    "caller_person_id": "customer.id",
    "caller_name": "customer.name",
    "sa_person_id": "technician.id",
    "sa_person_descr": "technician.name",
    "cc_sa_descr": "technician.name",
    "tagno": "tag",
    "is_in_history": "inHistory",
    "order_line.order_stat_uniq_id": "status",

}

function parseServiceOrderData(data) {
    //Loop through all the fields in data, see if we have a translation for them.
    let result = {};

    for (let key in data) {
        let fieldName = fields[key];
        if (fieldName) {
            let value = data[key][0]._;
            if (fieldName.split(".").length > 1) { //If it has a dot in it, it's a nested object
                let parentField = fieldName.split(".")[0];
                let obj = destructureStringToObject(fieldName, value);
                fieldName = parentField;

                if (result[parentField]) {
                    value = merge(result[parentField], obj);
                } else {
                    value = obj;
                }
            }
            //if (fieldName === "customer") {
                //if (!value.name) debugger;
            //    console.log(fieldName, value);
            //}
            result[fieldName] = value
        }
    }

    return result;
}

/* Removes all references to history objects from data. 
So that in history and out of history data have similar formatting. */
function sanitizeData(data) {
    const newData = {};
    for (const key in data) {
        const newKey = key.replace("_history", "");
        newData[newKey] = data[key];
    }
    return newData;
}

/* Perform a shallow merge of two objects */
function merge(obj1, obj2) {
    for (let key in obj2) {
        if (!obj1[key])
            obj1[key] = obj2[key]; //Do not overwrite existing keys
    }
    return obj1;
}

function destructureStringToObject(string, value) {
    let fieldAr = string.split(".");
    //let value = fieldAr.pop();
    let obj = {
        [fieldAr.pop()]: value
    };

    while (fieldAr[1]) {
        obj = {
            [fieldAr.pop()]: obj
        };
    }

    return obj;
}

module.exports = { parseServiceOrderData, sanitizeData };