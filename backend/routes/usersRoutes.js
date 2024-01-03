const express = require("express");
const userSchema = require("../models/Users");
const Database = require("../singleton");
const database = Database.getInstance();

const router = express.Router();

//Register an user
router.post("/users", async (req, res) => {
  await database.connect();
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.send({ message: error }));
});
router.get("/userNotification", async (req, res) => {
  await database.connect();
  const { email } = req.query;
  userSchema
    .findOne({ email: email })
    .then((data) => res.json(data.allowNotifications))
    .catch((error) => res.send({ message: error }));
});
router.put("/userNotification", async (req, res) => {
  await database.connect();
  const { email, allowNotifications } = req.body;

  await userSchema.updateOne({email: email}, {$set: {allowNotifications}})
  .then((data) => res.json(data))
  .catch((error) => res.send({ message: error }));
});
router.get("/getUser", async (req, res) => {
  await database.connect();
  const { email } = req.query;
  userSchema
    .findOne({ email: email })
    .then((data) => res.json(data))
    .catch((error) => res.send({ message: error }));
});
router.get("/userAvailability", async (req, res) => {
  await database.connect();
  const { email } = req.query;
  userSchema
    .findOne({ email: email })
    .then((data) => res.json(data.allowAvailability))
    .catch((error) => res.send({ message: error }));
});
router.put("/userAvailability", async (req, res) => {
  await database.connect();
  const { email, allowAvailability } = req.body;

  await userSchema.updateOne({email: email}, {$set: {allowAvailability}})
  .then((data) => res.json(data))
  .catch((error) => res.send({ message: error }));
});

module.exports = router;
