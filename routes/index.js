// core mods
// addon mods
const express = require('express');
// custom mods

// use router
const router = express.Router();

// routes
router.use('/movies', require('./movieRoutes'));
router.use('/users', require('./userRoutes'));

// exports
module.exports = router;