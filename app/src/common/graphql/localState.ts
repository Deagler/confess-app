import gql from 'graphql-tag';

export const GET_SELECTED_COMMUNITY_ID = gql`
  query getSelectedCommunityId {
    selectedCommunityId
  }
`;

export const GET_SELECTED_COMMUNITY = gql`
  query GetSelectedCommunity {
    selectedCommunity @client {
      id
      name
      abbreviation
      channels {
        id
        name
      }
    }
  }
`;

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
      firstName
      lastName
      email
      community {
        id
        name
        abbreviation
      }
      isAdmin
    }
  }
`;
