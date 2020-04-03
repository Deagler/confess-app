import { gql } from 'apollo-boost';

export const SUBMIT_COMMENT = gql`
  mutation SubmitComment(
    $communityId: String!
    $postId: String!
    $content: String!
  ) {
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
        }
        content
        totalLikes
        likes {
          firstName
          lastName
          communityUsername
        }
      }
    }
  }
`;