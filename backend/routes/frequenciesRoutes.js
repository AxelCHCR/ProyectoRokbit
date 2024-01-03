const express = require("express");
const frequencySchema = require("../models/Frequencies");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

router.post("/frequency", async (req, res) => {
    await database.connect();
    const frequency = frequencySchema(req.body);
    frequency
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.get("/frequency", async (req, res) => {
    await database.connect();
    const { email } = req.query;
    frequencySchema
        .findOne({ email: email })
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.put("/frequency", async (req, res) => {
    await database.connect();
    const { email, frequency } = req.body;
    console.log(email, frequency);

    frequencySchema
        .findOneAndUpdate(
            { email: email },
            { frequency: frequency },
            { new: true }
        )
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
module.exports = router;