"use strict";
function parseErrorCode(errorCode){
    const errorHash = {
        "A2GEN017": {message: "Your session has timed out.", status: 401}
    }

    return errorHash[errorCode] || errorCode;
}

/*Convert Astea errors into english*/
function parseError(error) {
    const errorHash = {
        "LOGGED_IN_MORE_THAN_ONCE": "Your username is already logged in to Astea.",
        "LOGIN_FAILED": "Your username or password is incorrect."
    }

    return errorHash[error] || error;
}
module.exports = { parseError, parseErrorCode} 