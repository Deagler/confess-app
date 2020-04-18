import gql from 'graphql-tag';

export const GET_AUTH_STATE = gql`
  query GetAuthState {
    authState @client {
      accessToken
    }
  }
`;

export const GET_LOCAL_USER = gql`
  query GetLocalUser {
    localUser @client {
      id
      communityUsername
      displayName
      email
      community {
        id
        name
        abbreviation
        imageURI
      }
      isAdmin
    }
  }
`;
