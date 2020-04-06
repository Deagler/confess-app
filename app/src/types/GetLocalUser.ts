/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocalUser
// ====================================================

export interface GetLocalUser_localUser_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
  imageURI: string;
}

export interface GetLocalUser_localUser {
  __typename: "User";
  id: string;
  communityUsername: string;
  firstName: string;
  lastName: string;
  email: string;
  community: GetLocalUser_localUser_community | null;
  isAdmin: boolean | null;
}

export interface GetLocalUser {
  localUser: GetLocalUser_localUser | null;
}
