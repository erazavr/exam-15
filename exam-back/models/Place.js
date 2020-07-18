const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        req: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },

});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
