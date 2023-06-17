const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const connectDb = require("./db/connect");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Orizon API");
});

app.listen(port, async () => {
  console.log(`App is listening on port ${port}`);
  try {
    await connectDb();
    console.log("connect to MongoDB");
  } catch (error) {
    console.log("Couldn't connect to MongoDB", error);
  }
});
