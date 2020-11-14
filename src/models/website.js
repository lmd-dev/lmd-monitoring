"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Website = void 0;
const database_1 = require("../database/database");
const monitoring_result_1 = require("./monitoring-result");
const sequelize_1 = require("sequelize");
const sequelize = database_1.Database.getHandle().sequelize;
;
class Website extends sequelize_1.Model {
}
exports.Website = Website;
Website.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    expectedStatusCode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    checkSSL: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Website'
});
Website.hasMany(monitoring_result_1.MonitoringResult, { as: 'results' });
//MonitoringResult.belongsTo(Website, { as: 'website' });
//# sourceMappingURL=website.js.map