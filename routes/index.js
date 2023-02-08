// core mods
// addon mods
const express = require('express');
// custom mods

// use router
const router = express.Router();

// routes
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

// exports
module.exports = router;