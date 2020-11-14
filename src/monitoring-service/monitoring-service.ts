import { Website } from "../models/website";
import { MonitoringResult } from "../models/monitoring-result";
import { User } from "../models/user";

const fetch = require('node-fetch');
const sslChecker = require('ssl-checker');
const nodemailer = require("nodemailer");

const { smtp, monitoring } = require('@settings');

/**
 * Monitoring service
 * Check the status of the websites and notify users when problems occures
 */
export class MonitoringService
{
    //Timer used to monitor websites at each settings.monitoring.interval miliseconds
    private _timer: NodeJS.Timer;

    /**
     * Constructor
     */
    constructor()
    {
        this._timer = null;
    }

    /**
     * Starts the monitoring
     */
    start()
    {
        this._timer = setTimeout(() => { this.monitorWebsites(); }, monitoring.interval);
    }

    /**
     * Stop the monitoring
     */
    stop()
    {
        clearTimeout(this._timer);
    }

    /**
     * Monitors all the websites
     */
    async monitorWebsites()
    {
        //Get the websites from the DB
        const websites = await Website.findAll();

        let promises = new Array<Promise<any>>();

        //Monitors each website
        websites.forEach((website: any) =>
        {
            promises.push(this.monitorWebsite(website));
        });

        await Promise.all(promises);

        //Restart the monitoring timer
        this.start();        
    }

    /**
     * Monitors the given website
     * @param website The website to monitor
     */
    async monitorWebsite(website: IWebsite): Promise<any>
    {
        let urlStatus = 0, sslStatus = false;

        //Checks the accessibility of the URL
        urlStatus = await this.checkURL(website);

        //Checks the SSL certificate validity
        sslStatus = website.checkSSL ? await this.checkSSL(website) : false;

        //Finds the last monitoring result for the website
        MonitoringResult.findOne({
            where: {
                WebsiteId: website.id,
            },
            order: [
                ['id', 'DESC']
            ]
        }).then((result) =>
        {
            //If a last result exists and has the same state => updates last monitoring date
            if (result && result.obtainedStatusCode === urlStatus && result.sslStatus === sslStatus)
            {
                result.update({
                    lastMonitoring: new Date()
                });
            }
            else
            {
                //Else creates a new monitoring result with the current status
                MonitoringResult.create({
                    obtainedStatusCode: urlStatus,
                    sslStatus: sslStatus,
                    firstMonitoring: new Date(),
                    lastMonitoring: new Date(),
                    WebsiteId: website.id
                });

                //If the website has problems => send an email to users
                if (urlStatus !== website.expectedStatusCode || website.checkSSL && sslStatus === false)
                {
                    this.sendMail(website, urlStatus, sslStatus);
                }
            }
        });

        return;
    }

    /**
     * Checks the accessibility of the website and returns the status code
     * @param website Website to check
     */
    async checkURL(website: IWebsite): Promise<number>
    {
        try
        {
            let res = await fetch(website.url)

            return res.status;
        }
        catch (error)
        {
            return 404;
        }
    }

    /**
     * Checks the SSL certificate validity
     * @param website Website to check
     */
    async checkSSL(website: IWebsite): Promise<boolean>
    {
        try
        {
            let url = new URL(website.url);
            let res = await sslChecker(url.hostname);
            return res.valid;
        }
        catch (error)
        {
            return false;
        }

    }

    /**
     * Send an email to users about problem detected for the website
     * @param website Website which have problems
     * @param statusCode Obtained status code
     * @param sslStatus SSL certificate status
     */
    async sendMail(website: IWebsite, statusCode: number, sslStatus: boolean)
    {
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

        const users = await User.findAll();

        //Sends email with defined transport object
        let info = await transporter.sendMail({
            from: '"Monotoring Web <monitoring@lesmoulinsdudev.com>', 
            to: users.map((user) =>
            {
                return user.email;
            }), 
            subject: `[Monitoring web] Problème détecté sur ${website.name}`, 
            html: `
                <h1>PROBLEME SUR LE SITE ${website.name}</h1>
                <p>
                    <ul>
                        <li>URL : ${website.url}</li>
                        <li>Status Code : ${statusCode} / ${website.expectedStatusCode}</li>                    
                        <li>SSL Status : ${ website.checkSSL ? sslStatus : 'not required'}</li>
                    </ul>
                </p>
                `
        });
    }
}