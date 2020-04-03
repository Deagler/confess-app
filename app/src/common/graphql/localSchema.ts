import gql from 'graphql-tag';
// Define types in local state here

export const typeDefs = gql`
  type AuthState {
    accessToken: String!
    localUser: User
  }

  extend type Query {
    isLoggedIn: Boolean!
    authState: AuthState
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
    authState: AuthState
  }

  extend type Mutation {
    attemptLoginWithEmailLink(
      userEmail: String!
      emailLink: String!
    ): LoginResponse
  }
`;
