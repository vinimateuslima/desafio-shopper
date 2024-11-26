const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ridesSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    origin: {
      type: String
    },
    destination: {
      type: String
    },
    distance: {
      type: Number
    },
    driver: {
        id: Number,
        name: string
    },
    value: {
      type: Number
    }
    
  },
  { timestamps: true }
);

const Customer = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      max: 3,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },

    rides: [ridesSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);
