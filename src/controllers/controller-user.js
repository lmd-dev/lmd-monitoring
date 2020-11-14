"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUser = void 0;
const user_1 = require("../models/user");
const bcrypt = require("bcrypt");
/**
 * Constroller responsible for users
 */
class ControllerUser {
    /**
     * Creates a new user
     * @param req
     * @param res
     * @param next
     */
    static create(req, res, next) {
        var _a;
        bcrypt.hash((_a = req.body) === null || _a === void 0 ? void 0 : _a.password, 10).then((hash) => {
            var _a, _b;
            user_1.User.create({
                login: (_a = req.body) === null || _a === void 0 ? void 0 : _a.login,
                password: hash,
                email: (_b = req.body) === null || _b === void 0 ? void 0 : _b.email
            }).then((user) => {
                res.status(201).json({ id: user.id });
            }).catch((error) => {
                res.status(500).json({ error: error });
            });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Updates an existing user
     * @param req
     * @param res
     * @param next
     */
    static update(req, res, next) {
        var _a;
        bcrypt.hash((_a = req.body) === null || _a === void 0 ? void 0 : _a.password, 10).then((hash) => {
            var _a, _b, _c;
            user_1.User.update({
                login: (_a = req.body) === null || _a === void 0 ? void 0 : _a.login,
                password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
                email: req.body.email
            }, {
                where: { id: (_c = req.params) === null || _c === void 0 ? void 0 : _c.id }
            }).then(() => {
                res.status(200).send();
            }).catch((error) => {
                res.status(500).json({ error: error });
            });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * removes an existing user
     * @param req
     * @param res
     * @param next
     */
    static remove(req, res, next) {
        var _a;
        user_1.User.destroy({
            where: { id: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id }
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Returns all users in the database
     * @param req
     * @param res
     * @param next
     */
    static findAll(req, res, next) {
        user_1.User.findAll({
            include: ['id', 'login', 'email']
        }).then((websites) => {
            res.status(200).json({
                websites: websites
            });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * try to log a user
     * @param req
     * @param res
     * @param next
     */
    static login(req, res, next) {
        var _a;
        user_1.User.findOne({
            where: {
                login: (_a = req.body) === null || _a === void 0 ? void 0 : _a.login
            }
        }).then((user) => {
            var _a;
            if (!user)
                res.status(401).redirect('/');
            else {
                bcrypt.compare((_a = req.body) === null || _a === void 0 ? void 0 : _a.password, user.password).then((result) => {
                    if (!result)
                        res.status(401).json({ error: "User not found." });
                    else {
                        req.session.connected = true;
                        res.redirect('/monitor.html');
                    }
                }).catch((error) => {
                    res.status(500).json({ error: error });
                });
            }
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Logout the user
     * @param req
     * @param res
     * @param next
     */
    static logout(req, res, next) {
        req.session.connected = false;
        res.redirect('/');
    }
    /**
     * Checks if the user is connected, reditecs him to the login page else
     * @param req
     * @param res
     * @param next
     */
    static auth(req, res, next) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.connected) {
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
    static authAPI(req, res, next) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.connected) {
            next();
        }
        else
            res.status(401).json({ error: "Forbidden access." });
    }
}
exports.ControllerUser = ControllerUser;
//# sourceMappingURL=controller-user.js.map