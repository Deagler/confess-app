/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLocalState
// ====================================================

export interface getLocalState_authState {
  __typename: "AuthState";
  accessToken: string;
}

export interface getLocalState_localUser_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
}

export interface getLocalState_localUser {
  __typename: "User";
  id: string;
  communityUsername: string;
  firstName: string;
  lastName: string;
  email: string;
  community: getLocalState_localUser_community | null;
}

export interface getLocalState {
  selectedCommunity: string | null;
  authState: getLocalState_authState | null;
  localUser: getLocalState_localUser | null;
}
