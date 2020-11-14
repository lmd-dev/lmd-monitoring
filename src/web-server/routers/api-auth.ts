const express = require('express');
const router = express.Router();

import { ControllerUser } from '../../controllers/controller-user';

//User login
router.post('/login', ControllerUser.login);

//User logout
router.post('/logout', ControllerUser.logout);

//User creation
router.post('/', ControllerUser.authAPI, ControllerUser.create);

//User updating
router.put('/:id', ControllerUser.authAPI, ControllerUser.update);

//User deleting
router.delete('/:id', ControllerUser.authAPI, ControllerUser.remove);

//Users getting
router.get('/', ControllerUser.authAPI, ControllerUser.findAll);

module.exports = router;