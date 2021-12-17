const Audit = require('../models/audit');
class AuditService {
    async create(data) {
        //TODO error handling and validation too
        const audit = await Audit.create({
            name: req.body.name,
            date: new Date(),
            order_id: req.body.orderId,
            technician_id: req.body.technicianId
        });
        return audit;
    }

    async getByName(name) {
        const audits = await Audit.findAll({
            where: {
                name: name
            }
        });
        return audits;
    }

    async getByOrderId(orderId) {
        const audits = await Audit.findAll({
            where: {
                order_id: orderId
            }
        });
    }
}

module.exports = AuditService;