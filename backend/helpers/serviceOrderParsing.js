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
    "is_in_history": "isInHistory",
    "cc_cust_company_descr": "customer.name",
    "cc_cust_company_id": "customer.id",
    "cust_id": "customer.id",
    "company_descr": "customer.name",
    "caller_person_id": "caller.id",
    "caller_name": "caller.name",
    "sa_person_id": "technician.id",
    "sa_person_descr": "technician.name",
    "cc_sa_descr": "technician.name"
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
            result[fieldName] = value
        }
    }

    return result;
}

/* Perform a shallow merge of two objects */
function merge(obj1, obj2) {
    for (let key in obj2) {
        obj1[key] = obj2[key];
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
        obj = { [fieldAr.pop()]: obj };
    }

    return obj;
}

/*
let test = parseServiceOrderData({
    "actgr_descr": "qntech",
    "is_in_history": "yes",
    "cc_cust_company_descr": "asshole mcghee",
    "cc_cust_company_id": "121241412515",
    "caller_person_id": "asschole mcgee",
    "caller_name": "asschole",
    "sa_person_id": "mx",
    "cc_sa_descr": "megaman x"
});

console.log(destructureStringToObject("a.b.c", "d"));
console.log(test);
*/

module.exports = { parseServiceOrderData };