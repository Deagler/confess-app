/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleStarComment
// ====================================================

export interface ToggleStarComment_toggleStarComment_comment_author_community {
  __typename: "Community";
  abbreviation: string;
}

export interface ToggleStarComment_toggleStarComment_comment_author {
  __typename: "User";
  firstName: string;
  lastName: string;
  communityUsername: string;
  community: ToggleStarComment_toggleStarComment_comment_author_community | null;
}

export interface ToggleStarComment_toggleStarComment_comment {
  __typename: "Comment";
  id: string;
  author: ToggleStarComment_toggleStarComment_comment_author | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean;
  isStarred: boolean | null;
}

export interface ToggleStarComment_toggleStarComment {
  __typename: "CommentUpdatedResponse";
  code: string;
  success: boolean;
  message: string;
  comment: ToggleStarComment_toggleStarComment_comment | null;
}

export interface ToggleStarComment {
  toggleStarComment: ToggleStarComment_toggleStarComment | null;
}

export interface ToggleStarCommentVariables {
  communityId: string;
  postId: string;
  commentId: string;
}
