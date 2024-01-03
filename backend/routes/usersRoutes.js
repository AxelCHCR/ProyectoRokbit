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
router.put("/userNotificationStatus/:id", async (req, res) => {
  await database.connect();
  const { id } = req.params;
  const {allowNotifications} = req.body;

  await userSchema.updateOne({_id: id}, {$set: {allowNotifications}})
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
router.put("/userAvailabilityStatus", async (req, res) => {
  await database.connect();
  const { email } = req.query;
  const {allowAvailability} = req.body;

  await userSchema.updateOne({email: email}, {$set: {allowAvailability}})
  .then((data) => res.json(data))
  .catch((error) => res.send({ message: error }));
});

module.exports = router;
