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
  id: string;
  abbreviation: string;
}

export interface GetPost_post_comments_items_author {
  __typename: "User";
  id: string;
  displayName: string;
  communityUsername: string;
  community: GetPost_post_comments_items_author_community | null;
  starCount: number | null;
}

export interface GetPost_post_comments_items {
  __typename: "Comment";
  id: string;
  creationTimestamp: number;
  content: string;
  author: GetPost_post_comments_items_author | null;
  totalLikes: number;
  isCommentLikedByUser: boolean;
  isStarred: boolean | null;
}

export interface GetPost_post_comments {
  __typename: "CommentConnection";
  items: (GetPost_post_comments_items | null)[];
  cursor: string | null;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  postNumber: number | null;
  creationTimestamp: number;
  authorAlias: string | null;
  title: string;
  content: string;
  totalLikes: number;
  isLikedByUser: boolean;
  isOriginalPoster: boolean;
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
