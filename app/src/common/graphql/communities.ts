import { gql } from 'apollo-boost';

export const GET_COMMUNITIES = gql`
  query GetCommunities {
    communities {
      id
      name
      abbreviation
      imageURI
      isEnabled
      channels {
        id
        name
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
      isEnabled
      channels {
        id
        icon
        name
      }
    }
  }
`;

export const GET_COMMUNITY_CHANNELS = gql`
  query GetCommunityChannels($communityId: ID!) {
    community(id: $communityId) {
      id
      channels {
        id
        icon
        name
      }
    }
  }
`;
