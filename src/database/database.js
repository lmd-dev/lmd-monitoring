"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
const { database: db } = require('@settings');
//Database singleton
class Database {
    /**
     * Constructor (private)
     */
    constructor() {
        try {
            this._sequelize = new sequelize_1.Sequelize(`${db.dialect}://${db.user}:${db.password}@${db.host}:${db.port}/${db.dbName}`, { logging: db.logging });
        }
        catch (error) {
            console.log(error);
        }
    }
    get sequelize() { return this._sequelize; }
    //Returns unique instance of the database
    static getHandle() {
        if (Database._handle == null)
            Database._handle = new Database();
        return Database._handle;
    }
}
exports.Database = Database;
Database._handle = null;
//# sourceMappingURL=database.js.map