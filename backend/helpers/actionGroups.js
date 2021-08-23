const actionGroupToIDs = {
    "QNTech": "Queens"
}

function toActionGroupID(actionGroup){
    return actionGroupToIDs[actionGroup];
}

module.exports = { toActionGroupID };