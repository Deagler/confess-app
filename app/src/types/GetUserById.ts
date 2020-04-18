/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserById
// ====================================================

export interface GetUserById_user_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
  isEnabled: boolean;
}

export interface GetUserById_user {
  __typename: "User";
  id: string;
  displayName: string | null;
  communityUsername: string;
  email: string;
  community: GetUserById_user_community | null;
  isAdmin: boolean | null;
  starCount: number | null;
}

export interface GetUserById {
  user: GetUserById_user | null;
}

export interface GetUserByIdVariables {
  id: string;
  disableSafeMode?: boolean | null;
}
