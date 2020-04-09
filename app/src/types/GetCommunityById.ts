/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunityById
// ====================================================

export interface GetCommunityById_community_channels {
  __typename: "Channel";
  id: string;
  name: string;
}

export interface GetCommunityById_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
  imageURI: string;
  isEnabled: boolean;
  channels: (GetCommunityById_community_channels | null)[];
}

export interface GetCommunityById {
  community: GetCommunityById_community | null;
}

export interface GetCommunityByIdVariables {
  communityId: string;
}
