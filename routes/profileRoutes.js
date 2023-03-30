const router = require("express").Router();
const {profile, validateProfileModel} = require("../models/profileModel.js");

router.post("/create", async (req, res) => {
    try {
        const { error } = validateProfileModel(req.body);
        if (error) {
            console.log(error)
            return res.status(401).send(error.details[0].message);
        }
        const foundProfile = await profile.findOne({ name: req.body.name });
        if(foundProfile){
            return res.status(401).send("profile already there");
        }

        await new profile({ ...req.body}).save();
        console.log("profile created")
        res.status(201).send({message: "profile successfully created"});
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/list", async (req, res) => {
    try{
        const data = await profile.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ data})
    }
});

module.exports = router;