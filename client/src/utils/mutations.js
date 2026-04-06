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
