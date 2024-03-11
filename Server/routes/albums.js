const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

// Import your artist model
const album = require("../models/album");

// Use body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// POST route to save an album
router.post("/save", async (req, res) => {
    // Extract data from the request body
    const { name, imageURL} = req.body;

    // Create a new album instance
    const newAlbum = new album({
        name,
        imageURL,
    });

    try {
        // Save the new artist to the database
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({ success: true, album: savedAlbum });
    } catch(error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await album.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, album : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.get("/getAll", async (req, res) => {
    const data = await album.find();

    if(data) {
        return res.status(200).send({success : true, album : data});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

router.put("/update/:id", async (req, res) => {
    const { name, imageURL} = req.body;

    const filter = {_id : req.params.id};

    try {
        const result = await album.findOneAndUpdate(filter, {
            name,
            imageURL,
        }, {new: true}
        );

        return res.status(200).send({success: true, data: result})
    }catch(e) {
        return res.status(400).send({ success: false, msg: error });
    }

});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await album.deleteOne(filter);

    if(result) {
        return res.status(200).send({success : true, msg: "Data Deleted Successfully!"});
    } else {
        return res.status(400).send({ success: false, msg: "Data not found!" });
    }
});

module.exports = router;