/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikePost
// ====================================================

export interface ToggleLikePost_toggleLikePost {
  __typename: "ToggleLikePostResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface ToggleLikePost {
  toggleLikePost: ToggleLikePost_toggleLikePost | null;
}

export interface ToggleLikePostVariables {
  communityId: string;
  postId: string;
}
