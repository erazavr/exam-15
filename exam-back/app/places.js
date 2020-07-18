const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require("nanoid");

const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Place = require('../models/Place');



const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async(req, res) => {
    const places = await Place.find();
    res.send(places)
});

router.get('/:id', async(req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).send({message: 'Not found'});
        }
        res.send(place)
    }catch (error) {
        res.status(400).send({message: "Not found"})
    }


});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const placeData = {
            title: req.body.title,
            description: req.body.description,
        };
        if(!placeData.user) {
            placeData.user = req.user._id
        }
        if (req.file) {
            placeData.image = req.file.filename
        }
        const place = new Place(placeData);
        await place.save();
        res.send(place)
    } catch (e) {
        res.status(401).send(e)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Place.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});



module.exports = router;