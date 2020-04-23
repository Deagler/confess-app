/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestFirebaseLink
// ====================================================

export interface RequestFirebaseLink_requestFirebaseLoginLink {
  __typename: "LinkRequestedResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface RequestFirebaseLink {
  requestFirebaseLoginLink: RequestFirebaseLink_requestFirebaseLoginLink | null;
}

export interface RequestFirebaseLinkVariables {
  userEmail: string;
}
