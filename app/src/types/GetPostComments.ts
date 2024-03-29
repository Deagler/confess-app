/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPostComments
// ====================================================

export interface GetPostComments_post_comments_items_author_community {
  __typename: "Community";
  id: string;
  abbreviation: string;
}

export interface GetPostComments_post_comments_items_author {
  __typename: "User";
  id: string;
  displayName: string | null;
  communityUsername: string;
  community: GetPostComments_post_comments_items_author_community | null;
  starCount: number | null;
}

export interface GetPostComments_post_comments_items {
  __typename: "Comment";
  id: string;
  creationTimestamp: number;
  author: GetPostComments_post_comments_items_author | null;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean;
  isStarred: boolean | null;
}

export interface GetPostComments_post_comments {
  __typename: "CommentConnection";
  items: (GetPostComments_post_comments_items | null)[];
  cursor: string | null;
}

export interface GetPostComments_post {
  __typename: "Post";
  id: string;
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
