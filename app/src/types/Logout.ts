/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_doFirebaseLogout {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface Logout {
  doFirebaseLogout: Logout_doFirebaseLogout | null;
}
