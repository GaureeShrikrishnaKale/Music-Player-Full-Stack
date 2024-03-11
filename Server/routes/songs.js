const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

// Import your song model
const song = require("../models/song");

// Use body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// POST route to save a song
router.post("/save", async (req, res) => {
    // Extract data from the request body
    const { name, imageURL, songURL, album, artist, language, category} = req.body;

    // Create a new album instance
    const newSong = new song({
        name,
        imageURL,
        songURL,
        album, 
        artist, 
        language, 
        category
    });

    try {
        // Save the new artist to the database
        const savedSong = await newSong.save();
        return res.status(200).send({ success: true, song: savedSong });
    } catch(error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await song.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, song : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.get("/getAll", async (req, res) => {

    const data = await song.find();

    if(data) {
        return res.status(200).send({success : true, song : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.put("/update/:id", async (req, res) => {
    const { name, imageURL, songURL, album, artist, language, category } = req.body;

    const filter = {_id : req.params.id};

    try {
        const result = await song.findOneAndUpdate(filter, {
            name,
            imageURL,
            songURL,
            album, 
            artist, 
            language, 
            category
        }, {new: true}
        );

        return res.status(200).send({success: true, data: result})
    }catch(e) {
        return res.status(400).send({ success: false, msg: error });
    }

});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await song.deleteOne(filter);

    if(result) {
        return res.status(200).send({success : true, msg: "Song Deleted Successfully!"});
    } else {
        return res.status(400).send({ success: false, msg: "Song not found!" });
    }
});
module.exports = router;