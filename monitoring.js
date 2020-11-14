"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const database_1 = require("./src/database/database");
const user_1 = require("./src/models/user");
const website_1 = require("./src/models/website");
const monitoring_result_1 = require("./src/models/monitoring-result");
const web_server_1 = require("./src/web-server/web-server");
const monitoring_service_1 = require("./src/monitoring-service/monitoring-service");
/**
 * Websites Monitoring Application
 */
class Application {
    /**
     * Constructor
     */
    constructor() {
        this._webServer = new web_server_1.WebServer();
        this._monitoringService = new monitoring_service_1.MonitoringService();
        this.initialize();
    }
    /**
     * Initializes the application
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._monitoringService.start();
                yield this.initializeDB();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**
     * Initializes database
     */
    initializeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const { database } = require("@settings");
            const db = database_1.Database.getHandle();
            yield user_1.User.sync({ force: database.force });
            yield website_1.Website.sync({ force: database.force });
            yield monitoring_result_1.MonitoringResult.sync({ force: database.force });
        });
    }
}
//Entry point
let app = new Application();
//# sourceMappingURL=monitoring.js.map