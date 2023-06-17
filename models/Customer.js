const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
  },
  surname: {
    type: String,
    required: [true, "Please provide a surname"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email!"],
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
