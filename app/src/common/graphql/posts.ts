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
            firstName
            lastName
            communityUsername
            community {
              abbreviation
            }
          }
          content
          totalLikes
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

export const GET_COMMUNITY_POSTS = gql`
  query GetCommunityPosts($id: ID!) {
    community(id: $id) {
      id
      feed {
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

export const GET_POST_LIKE_STATUS = gql`
  query GetPostLikeData($communityId: ID!, $postId: ID!) {
    post(communityId: $communityId, postId: $postId) {
      id
      totalLikes
    }
  }
`;
export const CLIENT_TOGGLE_LIKE_POST = gql`
  mutation ToggleLikePost($communityId: ID!, $postId: ID!) {
    clientToggleLikePost(communityId: $communityId, postId: $postId) @client {
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
