const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// get all users
exports.getAll = (req, res, next) => {
    mongodb
        .getDb()
        .db('moviedb')
        .collection('users')
        .find() // connect to the db and collection. return all users
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};
// get a single user
exports.getSingle = async (req, res, next) => {
    // check if id from params is valid
    if (!ObjectId.isValid(req.params.userId)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.userId); // get the id entered in the url
    mongodb
        .getDb()
        .db('moviedb')
        .collection('users')
        .find({
            _id: userId
        }) // connect to the db and collection. select the user by id
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};
// create user
exports.createUser = async (req, res, next) => {
    // #swagger.description = 'Password: At least 1 lowercase, 1 uppercase, 1 number, 1 special charater [ !@#$%^&* ], 8-32 characters long'
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImg: req.body.profileImg,
        isAdmin: req.body.isAdmin
    }; // object getting the req body info
    const response = await mongodb
        .getDb()
        .db('moviedb')
        .collection('users')
        .insertOne(newUser); // connect to the db and collection. select the user by id and pass the newUser info
    // respond with status
    if (response.acknowledged) {
        res.status(201).json(response); // successful
    } else {
        res.status(500).json(response.error || 'There was an error while creating the user.'); // failed
    }
};

// update user
exports.updateUser = async (req, res, next) => {
    // check if id from params is valid
    if (!ObjectId.isValid(req.params.userId)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.userId); // get the id entered in the url
    const updateUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImg: req.body.profileImg,
        isAdmin: req.body.isAdmin
    }; // object getting the req body info
    const response = await mongodb
        .getDb()
        .db('moviedb')
        .collection('users')
        .replaceOne({
            _id: userId
        }, updateUser); // connect to the db and collection. select the user by id and pass the updatedUser info
    if (response.modifiedCount > 0) {
        res.status(201).json(response); // successful
    } else {
        res.status(500).json(response.error || 'There was an error while updating the user.'); // failed
    }
};

// delete user
exports.deleteUser = async (req, res, next) => {
    // check if id from params is valid
    if (!ObjectId.isValid(req.params.userId)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.userId); // get the id entered in the url
    const response = await mongodb
        .getDb()
        .db('moviedb')
        .collection('users')
        .deleteOne({
            _id: userId
        }, true); // connect to the db and collection. select the user by id
    if (response.deletedCount > 0) {
        res.status(201).json(response); // successful
    } else {
        res.status(500).json(response.error || 'There was an error while deleting the user.'); // failed
    }
};