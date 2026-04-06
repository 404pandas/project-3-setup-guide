import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_LISTINGS = gql`
  query getListings($username: String) {
    listings(username: $username) {
      _id
      itemName
      category
      price
      riskLevel
      region
      status
      description
      createdBy
      inquiries {
        _id
        inquiryText
        inquiryAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_LISTING = gql`
  query getSingleListing($listingId: ID!) {
    listing(listingId: $listingId) {
      _id
      itemName
      category
      price
      riskLevel
      region
      status
      description
      createdBy
      inquiries {
        _id
        inquiryText
        inquiryAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
