// core mods
// addon mods
const express = require('express');
// custom mods

// use router
const router = express.Router();

const movieController = require('../controller/movies');

// routes
router.get('/', movieController.getAll);

router.get('/:movieId', movieController.getSingle);

router.post('/', movieController.createMovie);

router.put('/:movieId', movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

// exports
module.exports = router;