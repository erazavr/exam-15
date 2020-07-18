const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./app/users');
const places = require('./app/places');
const comments = require('./app/comments');
const images = require('./app/images');

const config = require('./config');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', users);
    app.use('/places', places);
    app.use('/comments', comments);
    app.use('/images', images);

    app.listen(config.port, () => {
        console.log(`HTTP Server started on ${config.port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});