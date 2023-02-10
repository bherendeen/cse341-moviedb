// core mods
// addon mods
const express = require('express');
// custom mods
const usersController = require('../controller/userController');
const userValidation = require('../middleware/userValidation');
// use router
const router = express.Router();


// routes
router.get('/', usersController.getAllUsers);

router.get('/:userId', usersController.getSingleUser);

router.post('/', userValidation.createUserValidate, usersController.createUser);

router.put('/:userId', userValidation.createUserValidate, usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

// exports
module.exports = router;