/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_comments_items_author_community {
  __typename: "Community";
  abbreviation: string;
}

export interface GetPost_post_comments_items_author {
  __typename: "User";
  firstName: string;
  lastName: string;
  communityUsername: string;
  community: GetPost_post_comments_items_author_community | null;
}

export interface GetPost_post_comments_items {
  __typename: "Comment";
  id: string;
  creationTimestamp: number;
  content: string;
  author: GetPost_post_comments_items_author | null;
  totalLikes: number;
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
  isLikedByUser: boolean;
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
