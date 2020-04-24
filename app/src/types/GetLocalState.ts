/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocalState
// ====================================================

export interface GetLocalState_authState {
  __typename: "AuthState";
  accessToken: string;
}

export interface GetLocalState_localUser_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
}

export interface GetLocalState_localUser {
  __typename: "User";
  id: string;
  communityUsername: string;
  displayName: string | null;
  email: string;
  community: GetLocalState_localUser_community | null;
}

export interface GetLocalState {
  authState: GetLocalState_authState | null;
  localUser: GetLocalState_localUser | null;
}
