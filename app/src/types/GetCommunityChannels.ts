/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunityChannels
// ====================================================

export interface GetCommunityChannels_community_channels {
  __typename: "Channel";
  id: string;
  icon: string | null;
  name: string;
}

export interface GetCommunityChannels_community {
  __typename: "Community";
  id: string;
  channels: (GetCommunityChannels_community_channels | null)[];
}

export interface GetCommunityChannels {
  community: GetCommunityChannels_community | null;
}

export interface GetCommunityChannelsVariables {
  communityId: string;
}
