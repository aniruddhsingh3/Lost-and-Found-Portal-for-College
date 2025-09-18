const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Books", "ID Cards", "Bags", "Clothing", "Others"],
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    itemType: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
