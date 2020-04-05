/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ServerToggleLikePost
// ====================================================

export interface ServerToggleLikePost_toggleLikePost_post {
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

export interface ServerToggleLikePost_toggleLikePost {
  __typename: "PostUpdatedResponse";
  code: string;
  success: boolean;
  message: string;
  post: ServerToggleLikePost_toggleLikePost_post | null;
}

export interface ServerToggleLikePost {
  toggleLikePost: ServerToggleLikePost_toggleLikePost | null;
}

export interface ServerToggleLikePostVariables {
  communityId: string;
  postId: string;
}
