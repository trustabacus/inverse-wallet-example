export type User = {
  creatorID?: string;
  address?: string;
  inverseUsername?: string;
};

export interface CreatorDetailsType extends User {}

export interface GenerateMobileWalletConfigsResponse {
  privateKey: string;
  publicKey: string;
  aaWallet: string;
}

export interface AddressDetailsType
  extends GenerateMobileWalletConfigsResponse {}

export type TwitterCriteriaInteractionType = 'likes' | 'retweets' | 'replies';

export type ClaimCriteriaType =
  | 'emailWhiteList'
  | 'emailDomain'
  | 'twitterInteractions'
  | 'twitterFollowers'
  | 'telegram'
  | 'directAnswerQuestionnaire'
  | 'mutliChoiceQuestionnaire'
  | 'patreon';

export interface ItemType {
  name: string;
  description: string;
  image: string;
  collectionID: string;
  ID: string;
  collectionId: string;
  claimCriteria?: ClaimCriteriaType;
  authorizedSubdomains?: string[];
  creator: User;
  twitterClaimCriteriaInteractions?: TwitterCriteriaInteractionType[];
  tweetLink?: string;
  profileLink?: string;
  contractAddress?: string;
  createdAt?: Date;
  campaignName?: string;
}

export type FetchClaimedItemsRequest = {
  address: string;
};
