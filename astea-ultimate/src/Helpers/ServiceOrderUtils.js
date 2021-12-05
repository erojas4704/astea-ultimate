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

export { getAgeInMinutes, getPureId };