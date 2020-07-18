const express = require('express');
const moment = require('moment');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', async(req,res) => {
    try {
        let place = req.query.place;
        let comments = await Comment.find();
        if(place) {
            comments = await Comment.find({place}).populate("user");
        }
        if(comments) return res.send(comments.sort((a, b) => moment(b.date, 'DD.MM.YY') - moment(a.date, 'DD.MM.YY')));
        else return res.sendStatus(404)

    }catch (error) {
        return res.status(500).send(error)
    }
});

router.post('/', auth, async(req, res) => {
    try {
        const commentData = {
            place: req.body.place,
            user: req.body.user,
            sq: req.body.sq,
            qof: req.body.qof,
            interior: req.body.interior,
            comment: req.body.comment
        };
        if(!commentData.user) {
            commentData.user = req.user._id
        }
        const comment = new Comment(commentData);
        await comment.save();
        res.send(comment)

    } catch (error) {
        return res.status(400).send(error)
    }
});

router.delete('/:id', [auth,permit('admin')], async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Comment.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});




module.exports = router;