const getAgeInMinutes = (serviceOrder) => {
    const difference = new Date() - new Date(serviceOrder.cachedAt);
    return Math.floor((difference / 1000) / 60);
}

/**Sanitizes an order ID to only be the numbers before the '@@' delimiter. In uppercase. */
const getPureId = id => {
    const result = /\w+/.exec(id);
    if (!result) return '';
    return result[0].toUpperCase();
}

const findOrderById = id => {
    //Returns a callback to be used by array.find
    //Removes all whitespace and finds by the digits preceeding the '@@' symbol.
    id = getPureId(id);
    // console.log(id);
    return order => {
        return getPureId(order.id) === id;
    }
}

const orderIdsMatch = (id1, id2) => {
    return getPureId(id1) === getPureId(id2);
}

export { getAgeInMinutes, getPureId, findOrderById, orderIdsMatch };