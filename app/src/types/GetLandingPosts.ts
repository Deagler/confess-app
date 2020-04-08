/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLandingPosts
// ====================================================

export interface GetLandingPosts_landingPosts {
  __typename: "Post";
  id: string;
  postNumber: number | null;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias: string | null;
}

export interface GetLandingPosts {
  landingPosts: GetLandingPosts_landingPosts[];
}
