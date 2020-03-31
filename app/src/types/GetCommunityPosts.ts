/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommunityPosts
// ====================================================

export interface GetCommunityPosts_community_feed_approvalInfo_approver {
  __typename: "User";
  id: string;
}

export interface GetCommunityPosts_community_feed_approvalInfo {
  __typename: "ApprovalInfo";
  approver: GetCommunityPosts_community_feed_approvalInfo_approver;
  approvalTimestamp: number;
}

export interface GetCommunityPosts_community_feed {
  __typename: "Post";
  id: string;
  title: string;
  authorAlias: string | null;
  creationTimestamp: number;
  approvalInfo: GetCommunityPosts_community_feed_approvalInfo | null;
  content: string;
  totalLikes: number;
  totalComments: number;
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
