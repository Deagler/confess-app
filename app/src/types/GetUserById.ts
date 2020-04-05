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
}

export interface GetUserById_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  communityUsername: string;
  email: string;
  community: GetUserById_user_community | null;
  isAdmin: boolean | null;
}

export interface GetUserById {
  user: GetUserById_user | null;
}

export interface GetUserByIdVariables {
  id: string;
}
