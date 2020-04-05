/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttemptLogin
// ====================================================

export interface AttemptLogin_attemptLoginWithEmailLink {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface AttemptLogin {
  attemptLoginWithEmailLink: AttemptLogin_attemptLoginWithEmailLink | null;
}

export interface AttemptLoginVariables {
  userEmail: string;
  emailLink: string;
}
