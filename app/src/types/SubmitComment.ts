/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitComment
// ====================================================

export interface SubmitComment_submitComment_comment_author {
  __typename: "User";
  firstName: string;
  lastName: string;
  communityUsername: string;
}

export interface SubmitComment_submitComment_comment_likes {
  __typename: "User";
  firstName: string;
  lastName: string;
  communityUsername: string;
}

export interface SubmitComment_submitComment_comment {
  __typename: "Comment";
  id: string;
  creationTimestamp: number;
  author: SubmitComment_submitComment_comment_author;
  content: string;
  totalLikes: number;
  likes: (SubmitComment_submitComment_comment_likes | null)[];
}

export interface SubmitComment_submitComment {
  __typename: "CreateCommentResponse";
  code: string;
  success: boolean;
  message: string;
  comment: SubmitComment_submitComment_comment | null;
}

export interface SubmitComment {
  submitComment: SubmitComment_submitComment | null;
}

export interface SubmitCommentVariables {
  communityId: string;
  postId: string;
  content: string;
}