const { User, Listing } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    listings: async (parent, args) => {
      const filter = args?.username ? { createdBy: args.username } : {};
      return Listing.find(filter).sort({ _id: -1 });
    },
    listing: async (parent, { listingId }) => {
      return Listing.findOne({ _id: listingId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
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
    addListing: async (
      parent,
      { itemName, category, price, riskLevel, region, description },
      context
    ) => {
      if (!context.user) throw AuthenticationError;
      return Listing.create({
        itemName, category, price, riskLevel, region, description,
        createdBy: context.user.username,
      });
    },
    updateListing: async (
      parent,
      { listingId, itemName, category, price, riskLevel, region, description, status }
    ) => {
      const updateFields = {};
      if (itemName) updateFields.itemName = itemName;
      if (category) updateFields.category = category;
      if (price) updateFields.price = price;
      if (riskLevel) updateFields.riskLevel = riskLevel;
      if (region) updateFields.region = region;
      if (description) updateFields.description = description;
      if (status) updateFields.status = status;

      return Listing.findOneAndUpdate(
        { _id: listingId },
        { $set: updateFields },
        { new: true }
      );
    },
    removeListing: async (parent, { listingId }) => {
      return Listing.findOneAndDelete({ _id: listingId });
    },
    addInquiry: async (parent, { listingId, inquiryText }, context) => {
      if (context.user) {
        return Listing.findOneAndUpdate(
          { _id: listingId },
          {
            $addToSet: {
              inquiries: { inquiryText, inquiryAuthor: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },
    removeInquiry: async (parent, { listingId, inquiryId }, context) => {
      if (context.user) {
        return Listing.findOneAndUpdate(
          { _id: listingId },
          {
            $pull: {
              inquiries: {
                _id: inquiryId,
                inquiryAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateInquiry: async (parent, { listingId, inquiryId, inquiryText }) => {
      return Listing.findOneAndUpdate(
        { _id: listingId, "inquiries._id": inquiryId },
        { $set: { "inquiries.$.inquiryText": inquiryText } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
