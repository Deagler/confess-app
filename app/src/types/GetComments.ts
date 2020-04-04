/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_items {
  __typename: "Comment";
  id: string;
  content: string;
  creationTimestamp: number;
  totalLikes: number;
}

export interface GetComments_comments {
  __typename: "CommentConnection";
  items: (GetComments_comments_items | null)[];
  cursor: string;
}

export interface GetComments {
  comments: GetComments_comments | null;
}

export interface GetCommentsVariables {
  communityId: string;
  postId: string;
  sortBy?: SortByInput | null;
  limit?: number | null;
  cursor?: string | null;
}
