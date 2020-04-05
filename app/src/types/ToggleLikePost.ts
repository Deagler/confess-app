/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikePost
// ====================================================

export interface ToggleLikePost_clientToggleLikePost_post {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  isLikedByUser: boolean;
}

export interface ToggleLikePost_clientToggleLikePost {
  __typename: "PostUpdatedResponse";
  code: string;
  success: boolean;
  message: string;
  post: ToggleLikePost_clientToggleLikePost_post | null;
}

export interface ToggleLikePost {
  clientToggleLikePost: ToggleLikePost_clientToggleLikePost | null;
}

export interface ToggleLikePostVariables {
  communityId: string;
  postId: string;
}