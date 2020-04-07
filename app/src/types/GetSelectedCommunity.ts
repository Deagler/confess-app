/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSelectedCommunity
// ====================================================

export interface GetSelectedCommunity_selectedCommunity_channels {
  __typename: "Channel";
  id: string;
  name: string;
  icon: string | null;
}

export interface GetSelectedCommunity_selectedCommunity {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
  imageURI: string;
  channels: (GetSelectedCommunity_selectedCommunity_channels | null)[];
}

export interface GetSelectedCommunity {
  selectedCommunity: GetSelectedCommunity_selectedCommunity | null;
}
