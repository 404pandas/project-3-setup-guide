const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const listingSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Weaponry",
      "Arcana",
      "Ingredients",
      "Monster Parts",
      "Forbidden Texts",
      "Contraband",
      "Curiosities",
    ],
  },
  price: {
    type: String,
    required: true,
  },
  riskLevel: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High", "Forbidden"],
    default: "Medium",
  },
  region: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Reserved", "Sold"],
    default: "Available",
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  inquiries: [
    {
      inquiryText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
      },
      inquiryAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
