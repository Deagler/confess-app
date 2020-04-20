import { gql } from 'apollo-boost';

export const GET_POST_BY_ID = gql`
  query GetPost(
    $communityId: ID!
    $postId: ID!
    $sortCommentsBy: SortByInput
    $commentsLimit: Int
    $commentsCursor: String
  ) {
    post(communityId: $communityId, postId: $postId) {
      id
      postNumber
      creationTimestamp
      authorAlias
      title
      content
      totalLikes
      isLikedByUser
      isOriginalPoster
      totalComments
      channelId
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
            id
            firstName
            lastName
            communityUsername
            community {
              id
              abbreviation
            }
            starCount
          }
          totalLikes
          isCommentLikedByUser
          isStarred
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
            id
            firstName
            lastName
            communityUsername
            community {
              id
              abbreviation
            }
            starCount
          }
          content
          totalLikes
          isCommentLikedByUser
          isStarred
        }
        cursor
      }
    }
  }
`;

export const SUBMIT_POST_FOR_APPROVAL = gql`
  mutation SubmitPostForApproval(
    $communityId: ID!
    $channelId: String!
    $title: String!
    $content: String!
    $authorAlias: String!
    $imageRef: String
  ) {
    submitPostForApproval(
      communityId: $communityId
      channelId: $channelId
      title: $title
      content: $content
      authorAlias: $authorAlias
      imageRef: $imageRef
    ) {
      code
      success
      message
      post {
        id
        title
        content
        authorAlias
        imageRef
        moderationStatus
        creationTimestamp
      }
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
