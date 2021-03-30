const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const coursesRouter = require("./routes/courses");
const studentsRouter = require("./routes/student");
const gpdRouter = require("./routes/GPD");
const degreeReqs = require("./routes/degreeReqs");

app.use("/courses", coursesRouter);
app.use("/student", studentsRouter);
app.use("/GPD", gpdRouter);
app.use("/degreeReqs", degreeReqs);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
