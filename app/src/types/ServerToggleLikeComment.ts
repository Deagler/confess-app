/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ServerToggleLikeComment
// ====================================================

export interface ServerToggleLikeComment_toggleLikeComment_comment_author_community {
  __typename: "Community";
  id: string;
  abbreviation: string;
}

export interface ServerToggleLikeComment_toggleLikeComment_comment_author {
  __typename: "User";
  id: string;
  displayName: string;
  communityUsername: string;
  community: ServerToggleLikeComment_toggleLikeComment_comment_author_community | null;
}

export interface ServerToggleLikeComment_toggleLikeComment_comment {
  __typename: "Comment";
  id: string;
  author: ServerToggleLikeComment_toggleLikeComment_comment_author | null;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean;
  isStarred: boolean | null;
}

export interface ServerToggleLikeComment_toggleLikeComment {
  __typename: "CommentUpdatedResponse";
  code: string;
  success: boolean;
  message: string;
  comment: ServerToggleLikeComment_toggleLikeComment_comment | null;
}

export interface ServerToggleLikeComment {
  toggleLikeComment: ServerToggleLikeComment_toggleLikeComment | null;
}

export interface ServerToggleLikeCommentVariables {
  communityId: string;
  postId: string;
  commentId: string;
}
