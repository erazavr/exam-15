const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    qof: Number,
    sq: Number,
    interior: Number,
    comment: {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;