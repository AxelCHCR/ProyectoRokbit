const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/usersRoutes");
dotenv.config(  );
const portDefault = 4000;
const app = express();
const port = process.env.PORT || portDefault;
//middlewares
app.use(express.json());
app.use("/api", userRoutes);
app.get("/", (req, res) => {
    res.send("API for Colibrí, a Rokbit Project");
  });
/*mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));*/
app.listen(port, () => console.log(`Server running on port ${port}`));
