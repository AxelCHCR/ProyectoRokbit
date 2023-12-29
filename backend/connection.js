const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const portDefault = 4000;
const app = express();
const port = process.env.PORT || portDefault;
app.get("/", (req, res) => {
    res.send("API for Colibrí, a Rokbit Project");
  });
//mongoose.connect("");
app.listen(port, () => console.log(`Server running on port ${port}`));
