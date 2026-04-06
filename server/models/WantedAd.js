const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const wantedAdSchema = new Schema({
  itemWanted: {
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
  offeredPrice: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
    enum: ["Casual", "Moderate", "Urgent", "Desperate"],
    default: "Moderate",
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Fulfilled", "Closed"],
    default: "Open",
  },
  fulfilledByListing: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const WantedAd = model("WantedAd", wantedAdSchema);

module.exports = WantedAd;
