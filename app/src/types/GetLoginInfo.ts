/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLoginInfo
// ====================================================

export interface GetLoginInfo_loginInfo {
  __typename: "LoginResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface GetLoginInfo {
  loginInfo: GetLoginInfo_loginInfo | null;
}
