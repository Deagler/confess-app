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
          id
          displayName
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
          id
          displayName
          communityUsername
          community {
            id
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
          id
          displayName
          communityUsername
          community {
            id
            abbreviation
          }
          starCount
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
