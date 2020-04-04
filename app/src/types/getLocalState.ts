/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLocalState
// ====================================================

export interface getLocalState_authState {
  __typename: "AuthState";
  accessToken: string;
}

export interface getLocalState {
  selectedCommunity: string;
  authState: getLocalState_authState | null;
}
