import { gql } from 'apollo-boost';

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      creationTimestamp
      authorId
      title
      content
      totalLikes
      totalComments
    }
  }
`;

export const GET_COMMUNITY_POSTS = gql`
  query GetCommunityPosts($id: ID!) {
    community(id: $id) {
      id
      posts {
        id
        title
        authorName
        creationTimestamp
        approvalInfo {
          approverId
          approvalTimestamp
        }
        content
      }
    }
  }
`;
