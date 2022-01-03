const { Op } = require("sequelize/dist");
const Material = require("../models/Material");

class MaterialService {
    /**
     * Searches for materials within the local database.
     * @param {string} id Work order ID
     * @param {Object} session Session object with user info and sessionId
     */
    static async search(criteria, limit) {
        const conditionals = {};
        for(let key in criteria){
            conditionals[key] = {
                [Op.like]: `%${criteria[key]}%`
            }
        }

        console.log(conditionals);

        const materials = await Material.findAll({
            where: {
                ...conditionals
            },
            limit
        })

        return materials;
    }
}

module.exports = MaterialService;