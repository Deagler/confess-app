import { gql } from 'apollo-boost';

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
  mutation AttemptLogin($userEmail: String!, $emailLink: String!) {
    attemptLoginWithEmailLink(userEmail: $userEmail, emailLink: $emailLink)
      @client {
      code
      success
      message
    }
  }
`;

export const ATTEMPT_SIGNUP = gql`
  mutation AttemptSignup($firstName: String!, $lastName: String!) {
    attemptSignUp(firstName: $firstName, lastName: $lastName) {
      code
      success
      message
      user {
        id
        firstName
        lastName
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
