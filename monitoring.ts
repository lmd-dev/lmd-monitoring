require('module-alias/register')

import { Database } from './src/database/database';
import { User } from './src/models/user';
import { Website } from './src/models/website';
import { MonitoringResult } from './src/models/monitoring-result';
import { WebServer } from './src/web-server/web-server';
import { MonitoringService } from './src/monitoring-service/monitoring-service';

/**
 * Websites Monitoring Application
 */
class Application
{
    //Web server giving web GUI for users
    private _webServer: WebServer;

    //Monitoring service to check websites status
    private _monitoringService: MonitoringService;

    /**
     * Constructor
     */
    constructor()
    {
        this._webServer = new WebServer();
        this._monitoringService = new MonitoringService();

        this.initialize();
    }

    /**
     * Initializes the application
     */
    private async initialize()
    {
        try
        {
            this._monitoringService.start();
            await this.initializeDB();

        }
        catch (error) 
        {
            console.log(error);
        }
    }

    /**
     * Initializes database
     */
    private async initializeDB()
    {
        const { database } = require("@settings");

        const db = Database.getHandle();
        await User.sync({ force: database.force });
        await Website.sync({ force: database.force });
        await MonitoringResult.sync({ force: database.force });
    }
}

//Entry point
let app = new Application();