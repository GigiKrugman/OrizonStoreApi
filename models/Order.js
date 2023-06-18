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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
