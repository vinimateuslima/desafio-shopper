const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);