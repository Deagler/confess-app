/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunities
// ====================================================

export interface GetCommunities_communities_channels {
  __typename: "Channel";
  id: string;
  name: string;
}

export interface GetCommunities_communities {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
  imageURI: string;
  channels: (GetCommunities_communities_channels | null)[];
}

export interface GetCommunities {
  communities: (GetCommunities_communities | null)[];
}
