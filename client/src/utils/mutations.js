import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing(
    $itemName: String!
    $category: String!
    $price: String!
    $riskLevel: String!
    $region: String!
    $description: String!
  ) {
    addListing(
      itemName: $itemName
      category: $category
      price: $price
      riskLevel: $riskLevel
      region: $region
      description: $description
    ) {
      _id
      itemName
      category
      price
      riskLevel
      region
      status
      description
    }
  }
`;

export const UPDATE_LISTING = gql`
  mutation updateListing(
    $listingId: ID!
    $itemName: String
    $category: String
    $price: String
    $riskLevel: String
    $region: String
    $description: String
    $status: String
  ) {
    updateListing(
      listingId: $listingId
      itemName: $itemName
      category: $category
      price: $price
      riskLevel: $riskLevel
      region: $region
      description: $description
      status: $status
    ) {
      _id
      itemName
      category
      price
      riskLevel
      region
      status
      description
    }
  }
`;

export const REMOVE_LISTING = gql`
  mutation removeListing($listingId: ID!) {
    removeListing(listingId: $listingId) {
      _id
    }
  }
`;

export const ADD_INQUIRY = gql`
  mutation addInquiry($listingId: ID!, $inquiryText: String!) {
    addInquiry(listingId: $listingId, inquiryText: $inquiryText) {
      _id
      inquiries {
        _id
        inquiryText
        inquiryAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_INQUIRY = gql`
  mutation removeInquiry($listingId: ID!, $inquiryId: ID!) {
    removeInquiry(listingId: $listingId, inquiryId: $inquiryId) {
      _id
      inquiries {
        _id
        inquiryText
        inquiryAuthor
        createdAt
      }
    }
  }
`;

export const ADD_WANTED_AD = gql`
  mutation addWantedAd(
    $itemWanted: String!
    $category: String!
    $offeredPrice: String!
    $urgency: String!
    $region: String!
    $description: String!
  ) {
    addWantedAd(
      itemWanted: $itemWanted
      category: $category
      offeredPrice: $offeredPrice
      urgency: $urgency
      region: $region
      description: $description
    ) {
      _id
      itemWanted
      category
      offeredPrice
      urgency
      region
      status
      description
      postedBy
    }
  }
`;

export const UPDATE_WANTED_AD = gql`
  mutation updateWantedAd($adId: ID!, $status: String, $fulfilledByListing: String) {
    updateWantedAd(adId: $adId, status: $status, fulfilledByListing: $fulfilledByListing) {
      _id
      status
      fulfilledByListing
    }
  }
`;

export const REMOVE_WANTED_AD = gql`
  mutation removeWantedAd($adId: ID!) {
    removeWantedAd(adId: $adId) {
      _id
    }
  }
`;

export const ADD_REPUTATION = gql`
  mutation addReputation($toUser: String!, $type: String!, $note: String) {
    addReputation(toUser: $toUser, type: $type, note: $note) {
      _id
      fromUser
      toUser
      type
      note
      createdAt
    }
  }
`;

export const UPDATE_REPUTATION = gql`
  mutation updateReputation($reputationId: ID!, $type: String!, $note: String) {
    updateReputation(reputationId: $reputationId, type: $type, note: $note) {
      _id
      type
      note
    }
  }
`;

export const REMOVE_REPUTATION = gql`
  mutation removeReputation($reputationId: ID!) {
    removeReputation(reputationId: $reputationId) {
      _id
    }
  }
`;

export const UPDATE_INQUIRY = gql`
  mutation updateInquiry(
    $listingId: ID!
    $inquiryId: ID!
    $inquiryText: String!
  ) {
    updateInquiry(
      listingId: $listingId
      inquiryId: $inquiryId
      inquiryText: $inquiryText
    ) {
      _id
      inquiries {
        _id
        inquiryText
        inquiryAuthor
        createdAt
      }
    }
  }
`;
