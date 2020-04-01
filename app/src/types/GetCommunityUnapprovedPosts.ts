/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunityUnapprovedPosts
// ====================================================

export interface GetCommunityUnapprovedPosts_community_unapprovedPosts {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
}

export interface GetCommunityUnapprovedPosts_community {
  __typename: "Community";
  id: string;
  unapprovedPosts: (GetCommunityUnapprovedPosts_community_unapprovedPosts | null)[];
}

export interface GetCommunityUnapprovedPosts {
  community: GetCommunityUnapprovedPosts_community | null;
}

export interface GetCommunityUnapprovedPostsVariables {
  id: string;
}
