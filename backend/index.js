const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const studentRouter = require("./api/routes/students");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use("/", studentRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
