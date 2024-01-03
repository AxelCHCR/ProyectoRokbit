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
router.get("/getUser", async (req, res) => {
  await database.connect();
  const { email } = req.query;
  userSchema
    .findOne({ email: email })
    .then((data) => res.json(data))
    .catch((error) => res.send({ message: error }));
});
router.put("/users", async (req, res) => {
  await database.connect();
  const updateFields = {};
  const { name, lastName, email, age, role } = req.body;

  // Verificar si los campos no son vacíos y actualizar el objeto updateFields
  if (name) updateFields.name = name;
  if (lastName) updateFields.lastName = lastName;
  if (email) updateFields.email = email;
  if (age) updateFields.age = age;
  if (role) updateFields.role = role;

  const user = await userSchema.findOne({ email: email });

  if (user) {
    await userSchema.updateOne({ email: email }, { $set: updateFields });
    res.status(200).json({ result: true });
  } else {
    res.status(404).json({ result: false });
  }
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

  await userSchema.updateOne({ email: email }, { $set: { allowNotifications } })
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

  await userSchema.updateOne({ email: email }, { $set: { allowAvailability } })
    .then((data) => res.json(data))
    .catch((error) => res.send({ message: error }));
});

module.exports = router;
