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

export const GET_COMMENTS = gql`
  query GetComments(
    $communityId: String!
    $postId: String!
    $sortBy: SortByInput
    $limit: Int
    $cursor: String
  ) {
    comments(
      communityId: $communityId
      postId: $postId
      sortBy: $sortBy
      limit: $limit
      cursor: $cursor
    ) {
      items {
        id
        content
        creationTimestamp
        totalLikes
      }
      cursor
    }
  }
`;
