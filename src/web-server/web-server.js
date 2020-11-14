"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServer = void 0;
const controller_user_1 = require("../controllers/controller-user");
const { sessions, http, https } = require("@settings");
/**
 * Embedded web srever
 */
class WebServer {
    /**
     * Constructor
     */
    constructor() {
        this.initializeExpress();
        this.initializeHTTPS();
    }
    get appExpress() { return this._appExpress; }
    /**
     * Initializes Express (server, routes, sessions)
     */
    initializeExpress() {
        const express = require('express');
        const session = require('express-session');
        //Creates express server
        this._appExpress = express();
        //Enable sessions management
        this._appExpress.use(session({
            secret: sessions.secretKey,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: sessions.httpsOnly }
        }));
        //Settings for Post data processing 
        this.appExpress.use(express.json());
        this.appExpress.use(express.urlencoded({ extended: true }));
        //Add route to website API
        this.appExpress.use('/api/website', require('./routers/api-website'));
        //Add route to authentication API
        this.appExpress.use('/auth', require('./routers/api-auth'));
        //Add special route to monitoring page (user needs to be authenticate)
        this.appExpress.use('/monitor.html', controller_user_1.ControllerUser.auth);
        //Static files management (html, js, css, jpg, ...)
        this.appExpress.use(express.static('public'));
        if (!https.enable) {
            this.appExpress.listen(http.port);
        }
    }
    //Initializes HTTPS 
    initializeHTTPS() {
        if (https.enable) {
            const fs = require('fs');
            //Get SSL key et certificate
            const options = {
                key: fs.readFileSync(https.keyFile),
                cert: fs.readFileSync(https.certFile)
            };
            this._https = require('https');
            //Starts the webserver
            this._https.createServer(options, this.appExpress).listen(https.port);
        }
    }
}
exports.WebServer = WebServer;
//# sourceMappingURL=web-server.js.map