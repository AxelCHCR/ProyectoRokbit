const express = require("express");
const userSchema = require("../models/Users");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

//create user
router.post("/createUser", async (req, res) => {
  await database.connect();
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;