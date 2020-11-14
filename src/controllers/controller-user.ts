import { Request, Response, NextFunction } from "express";
import { User } from '../models/user';

const bcrypt = require("bcrypt");

/**
 * Constroller responsible for users
 */
export class ControllerUser
{
    /**
     * Creates a new user
     * @param req
     * @param res
     * @param next
     */
    static create(req: Request, res: Response, next: NextFunction)
    {
        bcrypt.hash(req.body?.password, 10).then((hash: string) =>
        {
            User.create({
                login: req.body?.login,
                password: hash,
                email: req.body?.email
            }).then((user) =>
            {
                res.status(201).json({ id: user.id });
            }).catch((error) =>
            {
                res.status(500).json({ error: error });
            });
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * Updates an existing user
     * @param req
     * @param res
     * @param next
     */
    static update(req: Request, res: Response, next: NextFunction)
    {
        bcrypt.hash(req.body?.password, 10).then((hash: string) =>
        {
            User.update({
                login: req.body?.login,
                password: req.body?.password,
                email: req.body.email
            }, {
                where: { id: req.params?.id }
            }).then(() =>
            {
                res.status(200).send();
            }).catch((error) =>
            {
                res.status(500).json({ error: error });
            });
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * removes an existing user
     * @param req
     * @param res
     * @param next
     */
    static remove(req: Request, res: Response, next: NextFunction)
    {
        User.destroy({
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
     * Returns all users in the database
     * @param req
     * @param res
     * @param next
     */
    static findAll(req: Request, res: Response, next: NextFunction)
    {
        User.findAll({      
            include: ['id', 'login', 'email']
        }).then((websites) =>
        {
            res.status(200).json({
                websites: websites
            });
        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * try to log a user
     * @param req
     * @param res
     * @param next
     */
    static login(req: Request, res: Response, next: NextFunction)
    {
        User.findOne({
            where: {
                login: req.body?.login
            }
        }).then((user) =>
        {
            if (!user)
                res.status(401).redirect('/');
            else
            {
                bcrypt.compare(req.body?.password, user.password).then((result) =>
                {
                    if (!result)
                        res.status(401).json({ error: "User not found." });
                    else
                    {
                        (<any>req).session.connected = true;

                        res.redirect('/monitor.html');
                    }
                }).catch((error) =>
                {
                    res.status(500).json({ error: error });
                });
            }

        }).catch((error) =>
        {
            res.status(500).json({ error: error });
        });
    }

    /**
     * Logout the user
     * @param req
     * @param res
     * @param next
     */
    static logout(req: Request, res: Response, next: NextFunction)
    {
        (<any>req).session.connected = false;

        res.redirect('/');
    }

    /**
     * Checks if the user is connected, reditecs him to the login page else
     * @param req
     * @param res
     * @param next
     */
    static auth(req: Request, res: Response, next: NextFunction)
    {
        if ((<any>req).session?.connected)
        {
            next();
        }
        else
            res.redirect('/');
    }

    /**
     * Checks if an access to the API is ok
     * @param req
     * @param res
     * @param next
     */
    static authAPI(req: Request, res: Response, next: NextFunction)
    {
        if ((<any>req).session?.connected)
        {
            next();
        }
        else
            res.status(401).json({ error: "Forbidden access." });
    }
}