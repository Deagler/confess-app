/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPostComments
// ====================================================

export interface GetPostComments_post_comments_items {
  __typename: "Comment";
  id: string;
  totalLikes: number;
  content: string;
  creationTimestamp: number;
}

export interface GetPostComments_post_comments {
  __typename: "CommentConnection";
  items: (GetPostComments_post_comments_items | null)[];
  cursor: string | null;
}

export interface GetPostComments_post {
  __typename: "Post";
  comments: GetPostComments_post_comments;
}

export interface GetPostComments {
  post: GetPostComments_post | null;
}

export interface GetPostCommentsVariables {
  communityId: string;
  postId: string;
  sortCommentsBy?: SortByInput | null;
  commentsLimit?: number | null;
  commentsCursor?: string | null;
}