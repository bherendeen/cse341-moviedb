// core mods
// addon mods
const express = require('express');
// custom mods
const movieController = require('../controller/movieController');
const movieValidation = require('../middleware/movieValidation');
// use router
const router = express.Router();


// routes
router.get('/', movieController.getAllMovies);

router.get('/:movieId', movieController.getSingleMovie);

router.post('/', movieValidation.createMovieValidate, movieController.createMovie);

router.put('/:movieId', movieValidation.createMovieValidate, movieController.updateMovie);

router.delete('/:movieId', movieController.deleteMovie);

// exports
module.exports = router;