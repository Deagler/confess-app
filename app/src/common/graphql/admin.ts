import { gql } from 'apollo-boost';

export const GET_COMMUNITY_UNAPPROVED_POSTS = gql`
  query GetCommunityUnapprovedPosts($id: ID!) {
    community(id: $id) {
      id
      unapprovedPosts {
        id
        title
        authorAlias
        creationTimestamp
        content
      }
    }
  }
`;