import gql from 'graphql-tag';

export const GET_SELECTED_COMMUNITY = gql`
  query GetSelectedCommunity {
    selectedCommunity @client
  }
`;

export const TOGGLE_LIKE_POST = gql`
  query ToggleLikePost {
    isLikedByUser @client
  }
`;
