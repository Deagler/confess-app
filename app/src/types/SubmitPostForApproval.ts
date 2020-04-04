/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModerationStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitPostForApproval
// ====================================================

export interface SubmitPostForApproval_submitPostForApproval_post {
  __typename: "Post";
  id: string;
  title: string;
  content: string;
  authorAlias: string | null;
  moderationStatus: ModerationStatus;
  creationTimestamp: number;
}

export interface SubmitPostForApproval_submitPostForApproval {
  __typename: "CreatePostResponse";
  code: string;
  success: boolean;
  message: string;
  post: SubmitPostForApproval_submitPostForApproval_post | null;
}

export interface SubmitPostForApproval {
  submitPostForApproval: SubmitPostForApproval_submitPostForApproval | null;
}

export interface SubmitPostForApprovalVariables {
  communityId: string;
  channel: string;
  title: string;
  content: string;
  authorAlias: string;
}
