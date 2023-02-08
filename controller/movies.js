const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// get all movies
exports.getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('moviedb').collection('movies').find(); // connect to the db and collection. return all movies
    result.toArray().then((allFoundMovies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allFoundMovies);
    });
};

// get a single movie
exports.getSingle = async (req, res, next) => {
    const movieId = new ObjectId(req.params.movieId); // get the id entered in the url
    const result = await mongodb
        .getDb()
        .db('moviedb')
        .collection('movies')
        .find({
            _id: movieId
        }); // connect to the db and collection. select the movie by id
    result.toArray().then((singleFoundMovie) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(singleFoundMovie[0]);
    });
};
// create movie
exports.createMovie = async (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        imageURL: req.body.imageURL,
        description: req.body.description,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        movieLength: {
            movieHours: req.body.movieHours,
            movieMinutes: req.body.movieMinutes
        },
        genre: {
            action: req.body.genreAction,
            adventure: req.body.genreAdventure,
            animation: req.body.genreAnimation,
            biography: req.body.genreBiography,
            comedy: req.body.genreComedy,
            crime: req.body.genreCrime,
            documentary: req.body.genreDocumentary,
            drama: req.body.genreDrama,
            family: req.body.genreFamily,
            fantasy: req.body.genreFantasy,
            history: req.body.genreHistory,
            horror: req.body.genreHorror,
            music: req.body.genreMusic,
            musical: req.body.genreMusical,
            mystery: req.body.genreMystery,
            romance: req.body.genreRomance,
            sciFi: req.body.genreSciFi,
            shortFilm: req.body.genreShortFilm,
            sport: req.body.genreSport,
            superhero: req.body.genreSuperhero,
            thriller: req.body.genreThriller,
            war: req.body.genreWar,
            western: req.body.genreWestern
        },
        moviePreview: req.body.moviePreview
    };
    const result = await mongodb
        .getDb()
        .db('moviedb')
        .collection('movies')
        .insertOne(newMovie); // connect to the db and collection. select the movie by id and pass the newMovie info
    // respond with status
    if (result.acknowledged) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while creating the movie.'); // failed
    }
};

// update movie
exports.updateMovie = async (req, res, next) => {
    const movieId = new ObjectId(req.params.movieId); // get the id entered in the url
    const updateMovie = {
        title: req.body.title,
        imageURL: req.body.imageURL,
        description: req.body.description,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        movieLength: {
            movieHours: req.body.movieHours,
            movieMinutes: req.body.movieMinutes
        },
        genre: {
            action: req.body.genreAction,
            adventure: req.body.genreAdventure,
            animation: req.body.genreAnimation,
            biography: req.body.genreBiography,
            comedy: req.body.genreComedy,
            crime: req.body.genreCrime,
            documentary: req.body.genreDocumentary,
            drama: req.body.genreDrama,
            family: req.body.genreFamily,
            fantasy: req.body.genreFantasy,
            history: req.body.genreHistory,
            horror: req.body.genreHorror,
            music: req.body.genreMusic,
            musical: req.body.genreMusical,
            mystery: req.body.genreMystery,
            romance: req.body.genreRomance,
            sciFi: req.body.genreSciFi,
            shortFilm: req.body.genreShortFilm,
            sport: req.body.genreSport,
            superhero: req.body.genreSuperhero,
            thriller: req.body.genreThriller,
            war: req.body.genreWar,
            western: req.body.genreWestern
        },
        moviePreview: req.body.moviePreview
    }; // object getting the req body info
    const result = await mongodb
        .getDb()
        .db('moviedb')
        .collection('movies')
        .replaceOne({
            _id: movieId
        }, updateMovie); // connect to the db and collection. select the movie by id and pass the updatedMovie info
    if (result.modifiedCount > 0) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while updating the movie.'); // failed
    }
};

// delete movie
exports.deleteMovie = async (req, res, next) => {
    const movieId = new ObjectId(req.params.movieId); // get the id entered in the url
    const result = await mongodb
        .getDb()
        .db('moviedb')
        .collection('movies')
        .deleteOne({
            _id: movieId
        }, true); // connect to the db and collection. select the movie by id
    if (result.deletedCount > 0) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while deleting the movie.'); // failed
    }
};