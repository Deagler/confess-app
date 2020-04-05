/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCommentLikeData
// ====================================================

export interface getCommentLikeData_comment {
  __typename: "Comment";
  id: string;
  totalLikes: number;
}

export interface getCommentLikeData {
  comment: getCommentLikeData_comment | null;
}

export interface getCommentLikeDataVariables {
  communityId: string;
  postId: string;
  commentId: string;
}
