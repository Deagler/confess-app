import gql from 'graphql-tag';

export const GET_SELECTED_COMMUNITY = gql`
  query GetSelectedCommunity {
    selectedCommunity @client
  }
`;
