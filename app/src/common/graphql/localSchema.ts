import gql from 'graphql-tag';
// Define types in local state here

export const typeDefs = gql`
  type AuthState {
    accessToken: String!
  }

  extend type Query {
    authState: AuthState
    localUser: User
    selectedCommunity: Community
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
    requestFirebaseLoginLink(userEmail: String!): MutationResponse
    doFirebaseLogout: LoginResponse
  }
`;
