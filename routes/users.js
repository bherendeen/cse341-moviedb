// core mods
// addon mods
const express = require('express');
// custom mods
const userValidation = require('../middleware/userValidation');
// use router
const router = express.Router();

const usersController = require('../controller/users');

// routes
router.get('/', usersController.getAll);

router.get('/:userId', usersController.getSingle);

router.post('/', userValidation.createUserValidate, usersController.createUser);

router.put('/:userId', userValidation.createUserValidate, usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

// exports
module.exports = router;