const express = require("express");
const meetingSchema = require("../models/Meetings");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

router.post("/meetings", async (req, res) => {
    await database.connect();
    const meeting = meetingSchema(req.body);
    meeting
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.get("/meetings", async (req, res) => {
    await database.connect();
    const { email } = req.query;
    meetingSchema
        .find({ email: email })
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
router.put("/meetings", async (req, res) => {
    await database.connect();
    const { email, meetings } = req.body;

    meetingSchema
        .findOneAndUpdate(
            { email: email },
            { meetings: meetings },
            { new: true }
        )
        .then((data) => res.json(data))
        .catch((error) => res.send({ message: error }));
});
module.exports = router;