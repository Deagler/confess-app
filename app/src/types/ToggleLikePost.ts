/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikePost
// ====================================================

export interface ToggleLikePost_toggleLikePost_post {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
}

export interface ToggleLikePost_toggleLikePost {
  __typename: "PostUpdatedResponse";
  code: string;
  success: boolean;
  message: string;
  post: ToggleLikePost_toggleLikePost_post | null;
}

export interface ToggleLikePost {
  toggleLikePost: ToggleLikePost_toggleLikePost | null;
}

export interface ToggleLikePostVariables {
  communityId: string;
  postId: string;
}
