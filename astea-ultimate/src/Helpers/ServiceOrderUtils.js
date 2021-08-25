const getAgeInMinutes = (serviceOrder) => {
    const difference = new Date() - new Date(serviceOrder.cachedAt);
    return Math.floor((difference / 1000) / 60);
}

export { getAgeInMinutes };