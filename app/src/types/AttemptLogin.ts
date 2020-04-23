/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttemptLogin
// ====================================================

export interface AttemptLogin_attemptLogin {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface AttemptLogin {
  attemptLogin: AttemptLogin_attemptLogin | null;
}
