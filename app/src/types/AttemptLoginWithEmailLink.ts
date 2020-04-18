/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttemptLoginWithEmailLink
// ====================================================

export interface AttemptLoginWithEmailLink_attemptLoginWithEmailLink {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface AttemptLoginWithEmailLink {
  attemptLoginWithEmailLink: AttemptLoginWithEmailLink_attemptLoginWithEmailLink | null;
}

export interface AttemptLoginWithEmailLinkVariables {
  userEmail: string;
  emailLink: string;
}
