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

export const QUERY_WANTED_ADS = gql`
  query getWantedAds($username: String) {
    wantedAds(username: $username) {
      _id
      itemWanted
      category
      offeredPrice
      urgency
      region
      description
      postedBy
      status
      fulfilledByListing
      createdAt
    }
  }
`;

export const QUERY_SINGLE_WANTED_AD = gql`
  query getSingleWantedAd($adId: ID!) {
    wantedAd(adId: $adId) {
      _id
      itemWanted
      category
      offeredPrice
      urgency
      region
      description
      postedBy
      status
      fulfilledByListing
      createdAt
    }
  }
`;

export const QUERY_REPUTATION_FOR = gql`
  query getReputationFor($username: String!) {
    reputationFor(username: $username) {
      _id
      fromUser
      toUser
      type
      note
      createdAt
    }
  }
`;

export const QUERY_LEADERBOARD = gql`
  query getLeaderboard {
    leaderboard {
      username
      vouches
      burns
      score
    }
  }
`;
