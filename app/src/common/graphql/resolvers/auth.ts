import { firebaseApp } from '../../../services/firebase';
import {
  gql,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';

function persistAuthState(apolloCache, authState) {
  apolloCache.writeQuery({
    query: gql`
      query {
        authState {
          accessToken
        }
      }
    `,
    data: {
      authState,
    },
  });

  localStorage.setItem('authState', JSON.stringify(authState));
}

async function attemptLoginWithEmailLink(
  _,
  { userEmail, emailLink },
  { cache, client }
) {
  localStorage.removeItem('emailForSignIn');
  const apolloClient: ApolloClient<NormalizedCacheObject> = client;

  if (!firebaseApp.auth().isSignInWithEmailLink(emailLink)) {
    throw new ApolloError({
      errorMessage: 'Error logging in. Redirecting to Confess.',
    });
  }

  try {
    const credential = await firebaseApp
      .auth()
      .signInWithEmailLink(userEmail!, emailLink);
    const currentUser = firebaseApp.auth().currentUser!;
    const idToken = await currentUser.getIdToken();
    const authState = {
      accessToken: idToken,
      __typename: 'AuthState',
    };

    persistAuthState(cache, authState);

    if (credential.additionalUserInfo!.isNewUser) {
      return {
        code: 'auth/new_user',
        success: true,
        message: "Logged in. Let's take you to the signup page.",
        authState,
        __typename: 'LoginResponse',
      };
    }

    // Existing user: let's retrieve data from backend.
    const data = await apolloClient.query({
      query: GET_USER_BY_ID,
      variables: {
        id: currentUser.uid,
      },
    });

    /** DO CHECK FOR MISSING FIELDS HERE WITH SIGNUP DIALOG VALIDATOR */

    return {
      code: 'auth/logged_in',
      success: true,
      message: 'Successfully logged in.',
      authState,
      __typename: 'LoginResponse',
    };
  } catch (e) {
    throw new ApolloError({
      errorMessage: 'Error logging in. Redirecting to Confess.',
    });
  }
}

export const authResolvers = {
  attemptLoginWithEmailLink,
};
