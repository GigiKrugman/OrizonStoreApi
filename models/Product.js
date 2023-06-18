const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
