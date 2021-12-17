const { Op } = require('sequelize/dist');
const Audit = require('../models/Audit');
const OrderAudit = require('../models/OrderAudit');

class AuditService {
    static async addAudit(data) {
        const mainAudit = await Audit.findOne({
            where: {
                name: data.name
            }
        });
        if(!mainAudit) {
            await Audit.create({
                name: data.name,
                technician_id: data.technicianId || "erojas1" //TODO remove reference to me
            })
        }
        //TODO error handling and validation too
        const existing = await OrderAudit.findOne({
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
        const audit = await OrderAudit.create({
            name: data.name,
            order_id: data.id,
            location: data.location,
            status: data.status,
        });
        return audit;
    }

    static async getByName(name) {
        const audits = await OrderAudit.findAll({
            attributes: ['id', 'name', 'location', 'status', 'order_id', 'createdAt'],
            where: {
                name: name
            }
        });
        return audits;
    }

    static async getByOrderId(orderId) {
        const audits = await OrderAudit.findAll({
            attributes: ['id', 'name', 'location', 'status', 'order_id', 'createdAt'],
            where: {
                order_id: { [Op.like]: `${orderId}%` }
            }
        });
        return audits;
    }
}

module.exports = AuditService;