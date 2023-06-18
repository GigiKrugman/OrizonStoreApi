const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const connectDb = require("./db/connect");
const products = require("./routes/productRoutes");
const customers = require("./routes/customerRoutes");
const orders = require("./routes/orderRoutes");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorhandler");

//middleware
app.use(express.json());

//routes
app.use("/api/v1/products", products);
app.use("/api/v1/customers", customers);
app.use("/api/v1/orders", orders);

app.use(notFound);
app.use(errorHandlerMiddleware);

// app.get("/", (req, res) => {
//   res.send("Orizon API");
// });
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`App is listening on port ${port}`);
  try {
    await connectDb();
    console.log("connect to MongoDB");
  } catch (error) {
    console.log("Couldn't connect to MongoDB", error);
  }
});
