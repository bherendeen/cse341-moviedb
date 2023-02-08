// obtain env variable
const dotenv = require('dotenv');
dotenv.config();


const MongoClient = require('mongodb').MongoClient;

let _db;

// Initialize DB
const initDb = (callback) => {
  if (_db) {
    console.log('DB is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI) // retrieve connection string variable from .env file
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// get db
const getDb = () => {
  if (!_db) {
    throw Error('DB not initialized');
  }
  return _db;
};

// exports
module.exports = {
  initDb,
  getDb,
};