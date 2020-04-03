import { firebaseApp } from '../../../services/firebase';
import {
  gql,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';
import { apolloClient } from '../../../services/api/apolloClient';

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

export const authResolvers = {
  attemptLoginWithEmailLink: async (
    _,
    { userEmail, emailLink },
    { cache, client }
  ) => {
    localStorage.removeItem('emailForSignIn');
    const apolloClient: ApolloClient<NormalizedCacheObject> = client;

    if (!firebaseApp.auth().isSignInWithEmailLink(emailLink)) {
      throw new ApolloError({
        errorMessage: 'Error logging in. Redirecting to Confess.',
      });
    }

    try {
      await firebaseApp.auth().signInWithEmailLink(userEmail!, emailLink);

      const idToken = await firebaseApp.auth().currentUser?.getIdToken();
      const authState = {
        accessToken: idToken,
        __typename: 'AuthState',
      };

      persistAuthState(cache, authState);

      return {
        code: 200,
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
  },
};
