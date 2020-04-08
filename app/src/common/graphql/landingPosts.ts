import { gql } from 'apollo-boost';

export const GET_LANDING_POSTS = gql`
  query GetLandingPosts {
    landingPosts {
      id
      postNumber
      title
      creationTimestamp
      content
      authorAlias
    }
  }
`;
