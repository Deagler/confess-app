/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCommunityPosts
// ====================================================

export interface GetCommunityPosts_community_feed_items {
  __typename: "Post";
  id: string;
  postNumber: number | null;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  isLikedByUser: boolean;
}

export interface GetCommunityPosts_community_feed {
  __typename: "PostConnection";
  items: GetCommunityPosts_community_feed_items[];
  cursor: string | null;
}

export interface GetCommunityPosts_community {
  __typename: "Community";
  id: string;
  feed: GetCommunityPosts_community_feed;
}

export interface GetCommunityPosts {
  community: GetCommunityPosts_community | null;
}

export interface GetCommunityPostsVariables {
  id: string;
  sortBy?: SortByInput | null;
  cursor?: string | null;
  limit?: number | null;
}
