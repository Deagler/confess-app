import gql from 'graphql-tag';
// Define types in local state here

export const typeDefs = gql`
  type AuthState {
    accessToken: String!
  }

  extend type Query {
    authState: AuthState
    loginInfo: LoginResponse
    localUser(disableSafeMode: Boolean): User
    selectedCommunity: Community
  }

  type LoginResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    attemptLogin: LoginResponse
    attemptLoginWithEmailLink(
      userEmail: String!
      emailLink: String!
    ): LoginResponse
    doFirebaseLogout: LoginResponse
  }
`;
