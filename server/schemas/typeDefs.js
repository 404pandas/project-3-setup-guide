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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    listings(username: String): [Listing]
    listing(listingId: ID!): Listing
    me: User
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
  }
`;

module.exports = typeDefs;
