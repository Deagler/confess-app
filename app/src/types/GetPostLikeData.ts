/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostLikeData
// ====================================================

export interface GetPostLikeData_post {
  __typename: "Post";
  id: string;
  totalLikes: number;
}

export interface GetPostLikeData {
  post: GetPostLikeData_post | null;
}

export interface GetPostLikeDataVariables {
  communityId: string;
  postId: string;
}
