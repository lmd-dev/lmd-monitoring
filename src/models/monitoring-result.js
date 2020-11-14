"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringResult = void 0;
const database_1 = require("../database/database");
const sequelize_1 = require("sequelize");
const sequelize = database_1.Database.getHandle().sequelize;
;
class MonitoringResult extends sequelize_1.Model {
}
exports.MonitoringResult = MonitoringResult;
MonitoringResult.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    obtainedStatusCode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sslStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    firstMonitoring: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    lastMonitoring: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    WebsiteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'MonitoringResult'
});
//# sourceMappingURL=monitoring-result.js.map