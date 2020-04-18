/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitComment
// ====================================================

export interface SubmitComment_submitComment_comment_author_community {
  __typename: "Community";
  id: string;
  abbreviation: string;
}

export interface SubmitComment_submitComment_comment_author {
  __typename: "User";
  id: string;
  displayName: string;
  communityUsername: string;
  community: SubmitComment_submitComment_comment_author_community | null;
  starCount: number | null;
}

export interface SubmitComment_submitComment_comment {
  __typename: "Comment";
  id: string;
  creationTimestamp: number;
  author: SubmitComment_submitComment_comment_author | null;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean;
  isStarred: boolean | null;
}

export interface SubmitComment_submitComment {
  __typename: "CommentUpdatedResponse";
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
