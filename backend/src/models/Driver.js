const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    comment: String,
  },
  { timestamps: true }
);

const DriverSchema = new Schema(
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
      max: 255,
    },
    description: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    kmMin: {
      type: Number,
      required: true,
    },
    review: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
