const { Op } = require('sequelize/dist');
const Audit = require('../models/audit');

class AuditService {
    static async addAudit(data) {
        //TODO error handling and validation too
        const existing = await Audit.findOne({
            where: {
                [Op.and]: [
                    { name: data.name },
                    { order_id: data.id }
                ]
            }
        });

        if (existing) {
            existing.set({
                location: data.location,
                status: data.status,
                order_id: data.id
            });
            await existing.save();
            return existing;
        }
        const audit = await Audit.create({
            name: data.name,
            order_id: data.id,
            location: data.location,
            status: data.status,
            technician_id: data.technicianId || "erojas1"
        });
        return audit;
    }

    static async getByName(name) {
        const audits = await Audit.findAll({
            attributes: ['id', 'name', 'location', 'status', 'order_id', 'createdAt'],
            where: {
                name: name
            }
        });
        return audits;
    }

    static async getByOrderId(orderId) {
        const audits = await Audit.findAll({
            attributes: ['id', 'name', 'location', 'status', 'order_id', 'createdAt'],
            where: {
                order_id: { [Op.like]: `${orderId}%` }
            }
        });
        return audits;
    }
}

module.exports = AuditService;