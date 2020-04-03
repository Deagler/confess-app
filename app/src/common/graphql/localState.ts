import gql from 'graphql-tag';

export const GET_SELECTED_COMMUNITY = gql`
  query GetSelectedCommunity {
    selectedCommunity @client
  }
`;

export const GET_AUTH_STATE = gql`
  query GetAuthState {
    authState @client {
      accessToken
      localUser {
        id
        communityUsername
        firstName
        lastName
        email
        community {
          id
          name
          abbreviation
        }
      }
    }
  }
`;
