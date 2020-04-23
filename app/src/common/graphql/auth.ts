import { gql } from 'apollo-boost';

export const ATTEMPT_LOGIN = gql`
  mutation AttemptLogin {
    attemptLogin @client {
      code
      success
      message
    }
  }
`;

export const REQUEST_FIREBASE_LOGIN_LINK = gql`
  mutation RequestFirebaseLink($userEmail: String!) {
    requestFirebaseLoginLink(userEmail: $userEmail) {
      code
      success
      message
    }
  }
`;

export const ATTEMPT_LOGIN_WITH_EMAIL_LINK = gql`
  mutation AttemptLoginWithEmailLink($userEmail: String!, $emailLink: String!) {
    attemptLoginWithEmailLink(userEmail: $userEmail, emailLink: $emailLink)
      @client {
      code
      success
      message
    }
  }
`;

export const ATTEMPT_SIGNUP = gql`
  mutation AttemptSignup($displayName: String!) {
    attemptSignUp(displayName: $displayName) {
      code
      success
      message
      user {
        id
        displayName
        communityUsername
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
