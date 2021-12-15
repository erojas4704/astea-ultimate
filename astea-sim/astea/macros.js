const { getLocalServiceOrder } = require("./sv");

async function getServiceOrder(json){
    const id = json.xml.array[0].value[0]._
    const serviceOrder = await getLocalServiceOrder(id);
    return {d: serviceOrder};
}

module.exports = { getServiceOrder };