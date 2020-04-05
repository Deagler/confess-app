/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunityPosts
// ====================================================

export interface GetCommunityPosts_community_feed {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  isLikedByUser: boolean;
}

export interface GetCommunityPosts_community {
  __typename: "Community";
  id: string;
  feed: (GetCommunityPosts_community_feed | null)[];
}

export interface GetCommunityPosts {
  community: GetCommunityPosts_community | null;
}

export interface GetCommunityPostsVariables {
  id: string;
}
