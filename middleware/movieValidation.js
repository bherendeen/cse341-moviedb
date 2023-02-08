const validator = require('../helper/validate');

exports.createMovieValidate = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "imageURL": "required|string",
        "description": "required|string",
        "rating": "required|string",
        "releaseYear": "required|numeric",
        "movieHours": "required|numeric",
        "movieMinutes": "required|numeric",
        "genreAction": "required|boolean",
        "genreAdventure": "required|boolean",
        "genreAnimation": "required|boolean",
        "genreBiography": "required|boolean",
        "genreComedy": "required|boolean",
        "genreCrime": "required|boolean",
        "genreDocumentary": "required|boolean",
        "genreDrama": "required|boolean",
        "genreFamily": "required|boolean",
        "genreFantasy": "required|boolean",
        "genreHistory": "required|boolean",
        "genreHorror": "required|boolean",
        "genreMusic": "required|boolean",
        "genreMusical": "required|boolean",
        "genreMystery": "required|boolean",
        "genreRomance": "required|boolean",
        "genreSciFi": "required|boolean",
        "genreShortFilm": "required|boolean",
        "genreSport": "required|boolean",
        "genreSuperhero": "required|boolean",
        "genreThriller": "required|boolean",
        "genreWar": "required|boolean",
        "genreWestern": "required|boolean",
        "moviePreview": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: "required|boolean",
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}