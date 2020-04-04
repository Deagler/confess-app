/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_comments_items {
  __typename: "Comment";
  id: string;
  totalLikes: number;
  content: string;
  creationTimestamp: number;
}

export interface GetPost_post_comments {
  __typename: "CommentConnection";
  items: (GetPost_post_comments_items | null)[];
  cursor: string | null;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  creationTimestamp: number;
  authorAlias: string | null;
  title: string;
  content: string;
  totalLikes: number;
  totalComments: number;
  comments: GetPost_post_comments;
}

export interface GetPost {
  post: GetPost_post | null;
}

export interface GetPostVariables {
  communityId: string;
  postId: string;
  sortCommentsBy?: SortByInput | null;
  commentsLimit?: number | null;
  commentsCursor?: string | null;
}
