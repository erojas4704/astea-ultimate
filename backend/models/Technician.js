const { Model } = require('sequelize');

class Technician extends Model {
    static init = (sequelize, DataTypes) => {
        return super.init({
            id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            name: { type: DataTypes.STRING, allowNull: false },
            access: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
        }, {
            sequelize,
            modelName: "Technician"
        });
    }

    static associate(models) {
        //this.hasMany(models.Order);
        //models.Order.belongsTo(this);
    }
}

module.exports = Technician;
