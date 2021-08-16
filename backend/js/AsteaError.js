class AsteaError extends Error{
    constructor ( type, status, message ){
        super();
        this.type = type;
        this.status = status;
        this.message = message;
    }
}

module.exports = { AsteaError };