import { gql } from 'apollo-boost';

export const GET_COMMUNITIES = gql`
  query GetCommunities {
    communities {
      id
      name
      abbreviation
      channels {
        id
        name
        icon
      }
    }
  }
`;
