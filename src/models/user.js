"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../database/database");
const sequelize_1 = require("sequelize");
const sequelize = database_1.Database.getHandle().sequelize;
;
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});
//# sourceMappingURL=user.js.map