import { gql } from 'apollo-boost';

export const SUBMIT_COMMENT = gql`
  mutation SubmitComment($communityId: ID!, $postId: ID!, $content: String!) {
    selectedCommunity @client {
      id @export(as: "communityId")
    }
    submitComment(
      communityId: $communityId
      postId: $postId
      content: $content
    ) {
      code
      success
      message
      comment {
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
    }
  }
`;

export const GET_COMMENT_LIKE_STATUS = gql`
  query getCommentLikeData($communityId: ID!, $postId: ID!, $commentId: ID!) {
    comment(communityId: $communityId, postId: $postId, commentId: $commentId) {
      id
      totalLikes
    }
  }
`;

export const SERVER_TOGGLE_LIKE_COMMENT = gql`
  mutation ServerToggleLikeComment(
    $communityId: ID!
    $postId: ID!
    $commentId: ID!
  ) {
    toggleLikeComment(
      communityId: $communityId
      postId: $postId
      commentId: $commentId
    ) {
      code
      success
      message
      comment {
        id
        author {
          firstName
          lastName
          communityUsername
          community {
            abbreviation
          }
        }
        creationTimestamp
        content
        totalLikes
        isCommentLikedByUser
      }
    }
  }
`;
