const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Import your artist model
const artist = require('../models/artist');

// Use body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// POST route to save an artist
router.post("/save", async (req, res) => {
    // Extract data from the request body
    const { name, imageURL, twitter, instagram } = req.body;

    // Create a new artist instance
    const newArtist = new artist({
        name,
        imageURL,
        twitter,
        instagram,
    });

    try {
        // Save the new artist to the database
        const savedArtist = await newArtist.save();
        return res.status(200).send({ success: true, artist: savedArtist });
    } catch(error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await artist.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, artist : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.get("/getAll", async (req, res) => {

    const data = await artist.find();

    if(data) {
        return res.status(200).send({success : true, artist : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.put("/update/:id", async (req, res) => {
    const { name, imageURL, twitter, instagram } = req.body;

    const filter = {_id : req.params.id};

    try {
        const result = await artist.findOneAndUpdate(filter, {
            name,
            imageURL,
            twitter,
            instagram,
        }, {new: true}
        );

        return res.status(200).send({success: true, data: result})
    }catch(e) {
        return res.status(400).send({ success: false, msg: error });
    }

});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await artist.deleteOne(filter);

    if(result) {
        return res.status(200).send({success : true, msg: "Data Deleted Successfully!"});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

module.exports = router;
