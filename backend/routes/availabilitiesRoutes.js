const express = require("express");
const availabilitySchema = require("../models/Availabilities");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

router.post("/availability", async (req, res) => {
    await database.connect();
    const availability = availabilitySchema(req.body);
    availability
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.get("/availability", async (req, res) => {
    await database.connect();
    const { email } = req.query;
    availabilitySchema
        .findOne({ email: email })
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.put("/availability", async (req, res) => {
    await database.connect();
    const { email } = req.query;
    const { availables } = req.body;

    availabilitySchema
        .findOneAndUpdate(
            { email: email },
            { availables: availables },
            { new: true }
        )
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
module.exports = router;