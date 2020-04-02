import gql from 'graphql-tag';
// Define types in local state here

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    selectedCommunity: String!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type LoginResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    attemptLoginWithEmailLink(
      userEmail: String!
      emailLink: String!
    ): LoginResponse
  }
`;
