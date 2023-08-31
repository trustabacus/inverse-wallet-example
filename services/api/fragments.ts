import { gql } from 'graphql-request';

export const ItemFragments = gql`
  fragment Item on Item {
    ID
    name
    description
    image
    collectionId
    claimCriteria
    campaignName
    authorizedSubdomains
    creator {
      creatorID
      address
      inverseUsername
    }
    twitterClaimCriteriaInteractions
    profileLink
    tweetLink
    createdAt
  }
`;

export const CollectFragments = gql`
  ${ItemFragments}

  fragment Collection on Collection {
    ID
    name
    description
    image
    thumbnail
    contractAddress
    items {
      ...Item
    }
  }
`;

export const MintAuthorizationResponseFragments = gql`
  fragment MintAuthorizationResponse on MintAuthorizationResponse {
    packedData
    mintingABI
    mintingSignature
    smartContractAddress
  }
`;

export const TweetDetailsFragments = gql`
  fragment TweetDetails on TweetDetails {
    profileName
    profilePhoto
    profileHandle
    tweetText
  }
`;
