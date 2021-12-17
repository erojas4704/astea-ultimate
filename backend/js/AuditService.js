const Audit = require('../models/audit');

class AuditService {
    static async create(data) {
        //TODO error handling and validation too
        const audit = await Audit.create({
            name: data.name,
            order_id: data.id,
            location: data.location,
            technician_id: data.technicianId || "erojas1"
        }).catch(err => {
            console.log(err);
        });
        return audit;
    }

    static async getByName(name) {
        const audits = await Audit.findAll({
            where: {
                name: name
            }
        });
        return audits;
    }

    static async getByOrderId(orderId) {
        const audits = await Audit.findAll({
            where: {
                order_id: orderId
            }
        });
    }
}

module.exports = AuditService;