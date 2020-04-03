/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RejectPost
// ====================================================

export interface RejectPost_rejectPost {
  __typename: "RejectPostResponse";
  code: string;
  success: boolean;
  message: string;
}

export interface RejectPost {
  rejectPost: RejectPost_rejectPost | null;
}

export interface RejectPostVariables {
  communityId: string;
  postId: string;
  moderatorId: string;
  reason?: string | null;
}
