import { gql } from 'apollo-boost';

export const SUBMIT_COMMENT = gql`
  mutation SubmitComment($communityId: ID!, $postId: ID!, $content: String!) {
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
        isStarred
      }
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
        isStarred
      }
    }
  }
`;

export const TOGGLE_STAR_COMMENT = gql`
  mutation ToggleStarComment($communityId: ID!, $postId: ID!, $commentId: ID!) {
    toggleStarComment(
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
        isStarred
      }
    }
  }
`;
