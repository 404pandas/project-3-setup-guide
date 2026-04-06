const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Listing {
    _id: ID
    itemName: String!
    category: String!
    price: String!
    riskLevel: String!
    region: String!
    status: String!
    description: String!
    createdBy: String!
    inquiries: [Inquiry]
  }

  type Inquiry {
    _id: ID
    inquiryText: String
    inquiryAuthor: String
    createdAt: String
  }

  type WantedAd {
    _id: ID
    itemWanted: String!
    category: String!
    offeredPrice: String!
    urgency: String!
    region: String!
    description: String!
    postedBy: String!
    status: String!
    fulfilledByListing: String
    createdAt: String
  }

  type Reputation {
    _id: ID
    fromUser: String!
    toUser: String!
    type: String!
    note: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type LeaderboardEntry {
    username: String!
    vouches: Int!
    burns: Int!
    score: Int!
  }

  type Query {
    users: [User]
    user(username: String!): User
    listings(username: String): [Listing]
    listing(listingId: ID!): Listing
    me: User
    wantedAds(username: String): [WantedAd]
    wantedAd(adId: ID!): WantedAd
    reputationFor(username: String!): [Reputation]
    myReputation: [Reputation]
    leaderboard: [LeaderboardEntry]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addListing(
      itemName: String!
      category: String!
      price: String!
      riskLevel: String!
      region: String!
      description: String!
    ): Listing
    updateListing(
      listingId: ID!
      itemName: String
      category: String
      price: String
      riskLevel: String
      region: String
      description: String
      status: String
    ): Listing
    removeListing(listingId: ID!): Listing

    addInquiry(listingId: ID!, inquiryText: String!): Listing
    updateInquiry(listingId: ID!, inquiryId: ID!, inquiryText: String!): Listing
    removeInquiry(listingId: ID!, inquiryId: ID!): Listing

    addWantedAd(
      itemWanted: String!
      category: String!
      offeredPrice: String!
      urgency: String!
      region: String!
      description: String!
    ): WantedAd
    updateWantedAd(
      adId: ID!
      status: String
      fulfilledByListing: String
    ): WantedAd
    removeWantedAd(adId: ID!): WantedAd

    addReputation(toUser: String!, type: String!, note: String): Reputation
    updateReputation(reputationId: ID!, type: String!, note: String): Reputation
    removeReputation(reputationId: ID!): Reputation
  }
`;

module.exports = typeDefs;
