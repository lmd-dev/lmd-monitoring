const express = require('express');
const router = express.Router();

import { ControllerWebsite } from '../../controllers/controller-website';
import { ControllerUser } from '../../controllers/controller-user';

//Website creation
router.post('/', ControllerUser.authAPI, ControllerWebsite.create);

//Website updating
router.put('/:id', ControllerUser.authAPI, ControllerWebsite.update);

//Website deleting
router.delete('/:id', ControllerUser.authAPI, ControllerWebsite.remove);

//Websites getting
router.get('/', ControllerUser.authAPI, ControllerWebsite.findAll);

module.exports = router;