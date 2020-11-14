import { Request, Response, NextFunction } from "express";
import { Website } from '../models/website';
import { MonitoringResult } from "../models/monitoring-result";

/**
 * Constroller responsible for websites management
 */
export class ControllerWebsite
{
    /**
     * Creates a new website
     * @param req 
     * @param res
     * @param next
     */
    static create(req: Request, res: Response, next: NextFunction)
    {
        Website.create({
            name: req.body?.name,
            url: req.body?.url,
            expectedStatusCode: req.body?.expectedStatusCode,
            checkSSL: req.body?.checkSSL
        }).then((website) =>
        {
            res.status(201).json({ id: website.id });
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * Updates existing website
     * @param req
     * @param res
     * @param next
     */
    static update(req: Request, res: Response, next: NextFunction)
    {
        Website.update({
            name: req.body?.name,
            url: req.body?.url,
            expectedStatusCode: req.body?.expectedStatusCode,
            checkSSL: req.body?.checkSSL
        }, {
            where: { id: req.params?.id }
        }).then(() =>
        {
            res.status(200).send();
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * Remove existing website
     * @param req
     * @param res
     * @param next
     */
    static remove(req: Request, res: Response, next: NextFunction)
    {
        Website.destroy({
            where: { id: req.params?.id }
        }).then(() =>
        {
            res.status(200).send();
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * Returns all websites in the database
     * @param req
     * @param res
     * @param next
     */
    static findAll(req: Request, res: Response, next: NextFunction)
    {
        Website.findAll({
            include: [Website.associations.results]          
        }).then((websites) =>
        {
            console.log(websites);

            res.status(200).json({ websites: websites });
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }
}