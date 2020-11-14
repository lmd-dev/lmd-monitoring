"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const controller_user_1 = require("../../controllers/controller-user");
//User login
router.post('/login', controller_user_1.ControllerUser.login);
//User logout
router.post('/logout', controller_user_1.ControllerUser.logout);
//User creation
router.post('/', controller_user_1.ControllerUser.authAPI, controller_user_1.ControllerUser.create);
//User updating
router.put('/:id', controller_user_1.ControllerUser.authAPI, controller_user_1.ControllerUser.update);
//User deleting
router.delete('/:id', controller_user_1.ControllerUser.authAPI, controller_user_1.ControllerUser.remove);
//Users getting
router.get('/', controller_user_1.ControllerUser.authAPI, controller_user_1.ControllerUser.findAll);
module.exports = router;
//# sourceMappingURL=api-auth.js.map