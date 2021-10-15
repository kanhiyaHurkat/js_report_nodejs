const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const uri = "mongodb://localhost:27017/js-report";

mongoose.connect(uri,null,() => {})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
module.exports = db;
