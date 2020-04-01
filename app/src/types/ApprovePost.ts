/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApprovePost
// ====================================================

export interface ApprovePost_approvePost {
  __typename: "ApprovePostResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface ApprovePost {
  approvePost: ApprovePost_approvePost | null;
}

export interface ApprovePostVariables {
  communityId: string;
  postId: string;
  approverId: string;
}
