const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reputationSchema = new Schema({
  fromUser: {
    type: String,
    required: true,
  },
  toUser: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Vouched", "Burned"],
  },
  note: {
    type: String,
    maxlength: 200,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

// One rating per user pair — enforce at schema level
reputationSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Reputation = model("Reputation", reputationSchema);

module.exports = Reputation;
