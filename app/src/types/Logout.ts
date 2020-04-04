/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_doFirebaseLogout_authState {
  __typename: "AuthState";
  accessToken: string;
}

export interface Logout_doFirebaseLogout {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
  authState: Logout_doFirebaseLogout_authState | null;
}

export interface Logout {
  doFirebaseLogout: Logout_doFirebaseLogout | null;
}
