const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/usersRoutes");
const availablesRoutes = require("./routes/availabilitiesRoutes");

dotenv.config();
const portDefault = 4000;
const app = express();
const port = process.env.PORT || portDefault;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middlewares
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", availablesRoutes);

app.get("/", (req, res) => {
  res.send("API for Colibrí, a Rokbit Project");
});
/*mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));*/
app.listen(port, () => console.log(`Server running on port ${port}`));
