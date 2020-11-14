"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const controller_website_1 = require("../../controllers/controller-website");
const controller_user_1 = require("../../controllers/controller-user");
//Website creation
router.post('/', controller_user_1.ControllerUser.authAPI, controller_website_1.ControllerWebsite.create);
//Website updating
router.put('/:id', controller_user_1.ControllerUser.authAPI, controller_website_1.ControllerWebsite.update);
//Website deleting
router.delete('/:id', controller_user_1.ControllerUser.authAPI, controller_website_1.ControllerWebsite.remove);
//Websites getting
router.get('/', controller_user_1.ControllerUser.authAPI, controller_website_1.ControllerWebsite.findAll);
module.exports = router;
//# sourceMappingURL=api-website.js.map