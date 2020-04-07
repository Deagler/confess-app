import { gql } from 'apollo-boost';

export const GET_POST_BY_ID = gql`
  query GetPost(
    $communityId: ID!
    $postId: ID!
    $sortCommentsBy: SortByInput
    $commentsLimit: Int
    $commentsCursor: String
  ) {
    selectedCommunity @client {
      id @export(as: "communityId")
    }
    post(communityId: $communityId, postId: $postId) {
      id
      postNumber
      creationTimestamp
      authorAlias
      title
      content
      totalLikes
      isLikedByUser
      totalComments
      comments(
        sortBy: $sortCommentsBy
        limit: $commentsLimit
        cursor: $commentsCursor
      ) {
        items {
          id
          creationTimestamp
          content
          author {
            firstName
            lastName
            communityUsername
            community {
              abbreviation
            }
          }
          totalLikes
          isCommentLikedByUser
        }
        cursor
      }
    }
  }
`;

export const GET_POST_COMMENTS_ONLY = gql`
  query GetPostComments(
    $communityId: ID!
    $postId: ID!
    $sortCommentsBy: SortByInput
    $commentsLimit: Int
    $commentsCursor: String
  ) {
    selectedCommunity @client {
      id @export(as: "communityId")
    }
    post(communityId: $communityId, postId: $postId) {
      id
      comments(
        sortBy: $sortCommentsBy
        limit: $commentsLimit
        cursor: $commentsCursor
      ) {
        items {
          id
          creationTimestamp
          author {
            firstName
            lastName
            communityUsername
            community {
              abbreviation
            }
          }
          content
          totalLikes
          isCommentLikedByUser
        }
        cursor
      }
    }
  }
`;

export const SUBMIT_POST_FOR_APPROVAL = gql`
  mutation SubmitPostForApproval(
    $communityId: ID!
    $channel: String!
    $title: String!
    $content: String!
    $authorAlias: String!
  ) {
    submitPostForApproval(
      communityId: $communityId
      channel: $channel
      title: $title
      content: $content
      authorAlias: $authorAlias
    ) {
      code
      success
      message
      post {
        id
        title
        content
        authorAlias
        moderationStatus
        creationTimestamp
      }
    }
  }
`;

export const GET_POST_LIKE_STATUS = gql`
  query GetPostLikeData($communityId: ID!, $postId: ID!) {
    selectedCommunity @client {
      id @export(as: "communityId")
    }
    post(communityId: $communityId, postId: $postId) {
      id
      totalLikes
    }
  }
`;

export const SERVER_TOGGLE_LIKE_POST = gql`
  mutation ServerToggleLikePost($communityId: ID!, $postId: ID!) {
    toggleLikePost(communityId: $communityId, postId: $postId) {
      code
      success
      message
      post {
        id
        title
        authorAlias
        creationTimestamp
        content
        totalLikes
        totalComments
        isLikedByUser
      }
    }
  }
`;
