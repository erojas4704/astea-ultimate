const ERRORS = require("../helpers/errorCodes");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

class AsteaError extends Error {
    constructor(error, status, message) {
        super();
        if (typeof error === "object") {
            //Treat error as a response object
            try {
                const json = parser.parse(error.ExceptionDetail.Message);
                const errorCode = json.root.MessageAsteaCode;
                this.type = "AsteaError";
                this.status = ERRORS[errorCode].status || 500;
                this.message = ERRORS[errorCode].message || "An unknown error occurred.";
                return;
            } catch (e) {
                console.log(e);
                console.log(error);
            }
        }
        this.type = error;
        this.status = status;
        this.message = message;
    }
}

module.exports = { AsteaError };