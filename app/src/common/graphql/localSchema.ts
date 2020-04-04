import gql from 'graphql-tag';
// Define types in local state here

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    selectedCommunity: String!
    isLikedByUser: Boolean!
  }
`;
