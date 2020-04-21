/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCommunityUnapprovedPosts
// ====================================================

export interface GetCommunityUnapprovedPosts_community_unapprovedPosts_items {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
  imageRef: string | null;
}

export interface GetCommunityUnapprovedPosts_community_unapprovedPosts {
  __typename: "PostConnection";
  items: GetCommunityUnapprovedPosts_community_unapprovedPosts_items[];
  cursor: string | null;
}

export interface GetCommunityUnapprovedPosts_community {
  __typename: "Community";
  id: string;
  unapprovedPosts: GetCommunityUnapprovedPosts_community_unapprovedPosts;
}

export interface GetCommunityUnapprovedPosts {
  community: GetCommunityUnapprovedPosts_community | null;
}

export interface GetCommunityUnapprovedPostsVariables {
  id: string;
  sortBy?: SortByInput | null;
  cursor?: string | null;
  limit?: number | null;
}
