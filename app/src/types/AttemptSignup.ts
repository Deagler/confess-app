/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttemptSignup
// ====================================================

export interface AttemptSignup_attemptSignUp_user_community {
  __typename: "Community";
  id: string;
  name: string;
  abbreviation: string;
}

export interface AttemptSignup_attemptSignUp_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  communityUsername: string;
  email: string;
  community: AttemptSignup_attemptSignUp_user_community | null;
}

export interface AttemptSignup_attemptSignUp {
  __typename: "AttemptSignupResponse";
  code: string;
  success: boolean;
  message: string;
  user: AttemptSignup_attemptSignUp_user | null;
}

export interface AttemptSignup {
  attemptSignUp: AttemptSignup_attemptSignUp | null;
}

export interface AttemptSignupVariables {
  firstName: string;
  lastName: string;
}
