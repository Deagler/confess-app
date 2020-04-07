import { gql } from 'apollo-boost';

export const GET_COMMUNITIES = gql`
  query GetCommunities {
    communities {
      id
      name
      abbreviation
      imageURI
      channels {
        id
        name
        icon
      }
    }
  }
`;

export const GET_COMMUNITY_BY_ID = gql`
  query GetCommunityById($communityId: ID!) {
    community(id: $communityId) {
      id
      name
      abbreviation
      imageURI
      channels {
        id
        name
      }
    }
  }
`;
