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
exports.MonitoringService = void 0;
const website_1 = require("../models/website");
const monitoring_result_1 = require("../models/monitoring-result");
const user_1 = require("../models/user");
const fetch = require('node-fetch');
const sslChecker = require('ssl-checker');
const nodemailer = require("nodemailer");
const { smtp, monitoring } = require('@settings');
/**
 * Monitoring service
 * Check the status of the websites and notify users when problems occures
 */
class MonitoringService {
    /**
     * Constructor
     */
    constructor() {
        this._timer = null;
    }
    /**
     * Starts the monitoring
     */
    start() {
        this._timer = setTimeout(() => { this.monitorWebsites(); }, monitoring.interval);
    }
    /**
     * Stop the monitoring
     */
    stop() {
        clearTimeout(this._timer);
    }
    /**
     * Monitors all the websites
     */
    monitorWebsites() {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the websites from the DB
            const websites = yield website_1.Website.findAll();
            let promises = new Array();
            //Monitors each website
            websites.forEach((website) => {
                promises.push(this.monitorWebsite(website));
            });
            yield Promise.all(promises);
            //Restart the monitoring timer
            this.start();
        });
    }
    /**
     * Monitors the given website
     * @param website The website to monitor
     */
    monitorWebsite(website) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlStatus = 0, sslStatus = false;
            //Checks the accessibility of the URL
            urlStatus = yield this.checkURL(website);
            //Checks the SSL certificate validity
            sslStatus = website.checkSSL ? yield this.checkSSL(website) : false;
            //Finds the last monitoring result for the website
            monitoring_result_1.MonitoringResult.findOne({
                where: {
                    WebsiteId: website.id,
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then((result) => {
                //If a last result exists and has the same state => updates last monitoring date
                if (result && result.obtainedStatusCode === urlStatus && result.sslStatus === sslStatus) {
                    result.update({
                        lastMonitoring: new Date()
                    });
                }
                else {
                    //Else creates a new monitoring result with the current status
                    monitoring_result_1.MonitoringResult.create({
                        obtainedStatusCode: urlStatus,
                        sslStatus: sslStatus,
                        firstMonitoring: new Date(),
                        lastMonitoring: new Date(),
                        WebsiteId: website.id
                    });
                    //If the website has problems => send an email to users
                    if (urlStatus !== website.expectedStatusCode || website.checkSSL && sslStatus === false) {
                        this.sendMail(website, urlStatus, sslStatus);
                    }
                }
            });
            return;
        });
    }
    /**
     * Checks the accessibility of the website and returns the status code
     * @param website Website to check
     */
    checkURL(website) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield fetch(website.url);
                return res.status;
            }
            catch (error) {
                return 404;
            }
        });
    }
    /**
     * Checks the SSL certificate validity
     * @param website Website to check
     */
    checkSSL(website) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = new URL(website.url);
                let res = yield sslChecker(url.hostname);
                return res.valid;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * Send an email to users about problem detected for the website
     * @param website Website which have problems
     * @param statusCode Obtained status code
     * @param sslStatus SSL certificate status
     */
    sendMail(website, statusCode, sslStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            //Creates an email transporter
            let transporter = nodemailer.createTransport({
                host: smtp.host,
                port: smtp.port,
                secure: smtp.secure,
                auth: {
                    user: smtp.user,
                    pass: smtp.password,
                },
            });
            const users = yield user_1.User.findAll();
            //Sends email with defined transport object
            let info = yield transporter.sendMail({
                from: '"Monotoring Web <monitoring@lesmoulinsdudev.com>',
                to: users.map((user) => {
                    return user.email;
                }),
                subject: `[Monitoring web] Probl�me d�tect� sur ${website.name}`,
                html: `
                <h1>PROBLEME SUR LE SITE ${website.name}</h1>
                <p>
                    <ul>
                        <li>URL : ${website.url}</li>
                        <li>Status Code : ${statusCode} / ${website.expectedStatusCode}</li>                    
                        <li>SSL Status : ${website.checkSSL ? sslStatus : 'not required'}</li>
                    </ul>
                </p>
                `
            });
        });
    }
}
exports.MonitoringService = MonitoringService;
//# sourceMappingURL=monitoring-service.js.map