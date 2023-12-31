const express = require("express");
const notificationSchema = require("../models/Notifications");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

router.post("/notifications", async (req, res) =>{
    await database.connect();
    const notification = notificationSchema(req.body);
    notification
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.send({message: error}));
});
