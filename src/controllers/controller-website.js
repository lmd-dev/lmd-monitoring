"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerWebsite = void 0;
const website_1 = require("../models/website");
/**
 * Constroller responsible for websites management
 */
class ControllerWebsite {
    /**
     * Creates a new website
     * @param req
     * @param res
     * @param next
     */
    static create(req, res, next) {
        var _a, _b, _c, _d;
        website_1.Website.create({
            name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
            url: (_b = req.body) === null || _b === void 0 ? void 0 : _b.url,
            expectedStatusCode: (_c = req.body) === null || _c === void 0 ? void 0 : _c.expectedStatusCode,
            checkSSL: (_d = req.body) === null || _d === void 0 ? void 0 : _d.checkSSL
        }).then((website) => {
            res.status(201).json({ id: website.id });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Updates existing website
     * @param req
     * @param res
     * @param next
     */
    static update(req, res, next) {
        var _a, _b, _c, _d, _e;
        website_1.Website.update({
            name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
            url: (_b = req.body) === null || _b === void 0 ? void 0 : _b.url,
            expectedStatusCode: (_c = req.body) === null || _c === void 0 ? void 0 : _c.expectedStatusCode,
            checkSSL: (_d = req.body) === null || _d === void 0 ? void 0 : _d.checkSSL
        }, {
            where: { id: (_e = req.params) === null || _e === void 0 ? void 0 : _e.id }
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Remove existing website
     * @param req
     * @param res
     * @param next
     */
    static remove(req, res, next) {
        var _a;
        website_1.Website.destroy({
            where: { id: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id }
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    /**
     * Returns all websites in the database
     * @param req
     * @param res
     * @param next
     */
    static findAll(req, res, next) {
        website_1.Website.findAll({
            include: [website_1.Website.associations.results]
        }).then((websites) => {
            console.log(websites);
            res.status(200).json({ websites: websites });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }
}
exports.ControllerWebsite = ControllerWebsite;
//# sourceMappingURL=controller-website.js.map