const mongoose = require('mongoose');
const { DB_URI } = require('./config');

mongoose.connect(DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to DB!'));

module.exports = db;