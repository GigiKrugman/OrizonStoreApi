const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
