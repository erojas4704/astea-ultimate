const ERRORS = {
    "A2LOG904": {
        message: "'Service Agent' is not an active employee or was not found in the database. Please remove its value and use the lookup."
    },
    "A2STC013": {
        message: "Record Unavailable. Either you do not have permissions to view the record, or the record does not exist. This order may be in history.",
        status: 404
    },
    "A2GEN017": {
        message: "Account is logged already logged in.",
        status: 401
    },
    "A2BCM001": {
        message: `Check one of the following reasons: 
        Incorrect macro parameters, Insufficient macro parameters, BC or BO creation failure, BO does not belong to BC, or incorrect action name.`
    },
    "A2LDM001": {
        message: "There are unfulfilled demands attached to the order."
    },
    "A2DBM021": {
        message: `A Database error occurred.
        Contact your DB Administrator or check one of the following reasons: 
        Database is not running 
        Incorrect connection string 
        Incorrect SQL statement 
        Incorrect database structure`
    }
}

module.exports = ERRORS;