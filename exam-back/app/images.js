const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');


const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Image = require('../models/Image');

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

router.get('/', async (req, res) => {
    try {
        const place = req.query.place;
        let images = await Image.find();
        if(place) {
            images = await  Image.find({place})
        }
        if(images) return res.send(images);
        else return res.sendStatus(404)
    } catch (error) {
        return res.status(500).send(error)
    }

});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const imageData = req.body;

        if (req.file) {
            imageData.image = req.file.filename
        }

        if(!imageData.user) {
            imageData.user = req.user._id
        }

        const image = new Image(imageData);
        await image.save();
        res.send(image)
    }catch (error) {
        return res.status(400).send(error)
    }
});

router.delete('/:id', [auth,permit('admin')], async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;