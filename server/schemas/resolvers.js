const { User, Listing, WantedAd, Reputation } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (parent, { username }) => User.findOne({ username }),
    listings: async (parent, args) => {
      const filter = args?.username ? { createdBy: args.username } : {};
      return Listing.find(filter).sort({ _id: -1 });
    },
    listing: async (parent, { listingId }) => Listing.findOne({ _id: listingId }),
    me: async (parent, args, context) => {
      if (context.user) return User.findOne({ _id: context.user._id });
      throw AuthenticationError;
    },

    wantedAds: async (parent, args) => {
      const filter = args?.username ? { postedBy: args.username } : {};
      return WantedAd.find(filter).sort({ _id: -1 });
    },
    wantedAd: async (parent, { adId }) => WantedAd.findOne({ _id: adId }),

    reputationFor: async (parent, { username }) =>
      Reputation.find({ toUser: username }).sort({ _id: -1 }),

    myReputation: async (parent, args, context) => {
      if (context.user) return Reputation.find({ toUser: context.user.username });
      throw AuthenticationError;
    },

    leaderboard: async () => {
      const results = await Reputation.aggregate([
        {
          $group: {
            _id: "$toUser",
            vouches: { $sum: { $cond: [{ $eq: ["$type", "Vouched"] }, 1, 0] } },
            burns:   { $sum: { $cond: [{ $eq: ["$type", "Burned"]  }, 1, 0] } },
          },
        },
        { $addFields: { score: { $subtract: ["$vouches", "$burns"] } } },
        { $sort: { score: -1, vouches: -1 } },
        { $limit: 20 },
      ]);
      return results.map((r) => ({
        username: r._id,
        vouches:  r.vouches,
        burns:    r.burns,
        score:    r.score,
      }));
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw AuthenticationError;
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw AuthenticationError;
      const token = signToken(user);
      return { token, user };
    },

    addListing: async (parent, { itemName, category, price, riskLevel, region, description }, context) => {
      if (!context.user) throw AuthenticationError;
      return Listing.create({ itemName, category, price, riskLevel, region, description, createdBy: context.user.username });
    },
    updateListing: async (parent, { listingId, ...fields }) => {
      const updateFields = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined));
      return Listing.findOneAndUpdate({ _id: listingId }, { $set: updateFields }, { new: true });
    },
    removeListing: async (parent, { listingId }) =>
      Listing.findOneAndDelete({ _id: listingId }),

    addInquiry: async (parent, { listingId, inquiryText }, context) => {
      if (!context.user) throw AuthenticationError;
      return Listing.findOneAndUpdate(
        { _id: listingId },
        { $addToSet: { inquiries: { inquiryText, inquiryAuthor: context.user.username } } },
        { new: true, runValidators: true }
      );
    },
    removeInquiry: async (parent, { listingId, inquiryId }, context) => {
      if (!context.user) throw AuthenticationError;
      return Listing.findOneAndUpdate(
        { _id: listingId },
        { $pull: { inquiries: { _id: inquiryId, inquiryAuthor: context.user.username } } },
        { new: true }
      );
    },
    updateInquiry: async (parent, { listingId, inquiryId, inquiryText }) =>
      Listing.findOneAndUpdate(
        { _id: listingId, "inquiries._id": inquiryId },
        { $set: { "inquiries.$.inquiryText": inquiryText } },
        { new: true }
      ),

    addWantedAd: async (parent, { itemWanted, category, offeredPrice, urgency, region, description }, context) => {
      if (!context.user) throw AuthenticationError;
      return WantedAd.create({ itemWanted, category, offeredPrice, urgency, region, description, postedBy: context.user.username });
    },
    updateWantedAd: async (parent, { adId, status, fulfilledByListing }, context) => {
      if (!context.user) throw AuthenticationError;
      const updateFields = {};
      if (status) updateFields.status = status;
      if (fulfilledByListing) updateFields.fulfilledByListing = fulfilledByListing;
      return WantedAd.findOneAndUpdate(
        { _id: adId, postedBy: context.user.username },
        { $set: updateFields },
        { new: true }
      );
    },
    removeWantedAd: async (parent, { adId }, context) => {
      if (!context.user) throw AuthenticationError;
      return WantedAd.findOneAndDelete({ _id: adId, postedBy: context.user.username });
    },

    addReputation: async (parent, { toUser, type, note }, context) => {
      if (!context.user) throw AuthenticationError;
      if (context.user.username === toUser) throw new Error("Cannot rate yourself.");
      return Reputation.create({ fromUser: context.user.username, toUser, type, note: note || "" });
    },
    updateReputation: async (parent, { reputationId, type, note }, context) => {
      if (!context.user) throw AuthenticationError;
      return Reputation.findOneAndUpdate(
        { _id: reputationId, fromUser: context.user.username },
        { $set: { type, note: note || "" } },
        { new: true }
      );
    },
    removeReputation: async (parent, { reputationId }, context) => {
      if (!context.user) throw AuthenticationError;
      return Reputation.findOneAndDelete({ _id: reputationId, fromUser: context.user.username });
    },
  },
};

module.exports = resolvers;
