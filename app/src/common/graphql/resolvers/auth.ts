import { firebaseApp } from '../../../services/firebase';
import {
  gql,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';
import { GetUserById } from '../../../types/GetUserById';

function persistAuthState(apolloCache, authState) {
  apolloCache.writeQuery({
    query: gql`
      query getAuthState {
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
  console.log(emailLink, userEmail);
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
    const data = await apolloClient.query<GetUserById>({
      query: GET_USER_BY_ID,
      variables: {
        id: currentUser.uid,
      },
    });

    if (!data.data.user) {
      return {
        code: 'auth/new_user',
        success: true,
        message: "Logged in. Let's take you to the signup page.",
        authState,
        __typename: 'LoginResponse',
      };
    }

    if (data.data.user.community) {
      // const { community } = data.data.user;
      // TODO: Set selected community to users community
    }

    /** DO CHECK FOR MISSING FIELDS HERE WITH SIGNUP DIALOG VALIDATOR */

    return {
      code: 'auth/logged_in',
      success: true,
      message: 'Successfully logged in.',
      authState,
      localUser: data.data.user,
      __typename: 'LoginResponse',
    };
  } catch (e) {
    throw new ApolloError({
      errorMessage: 'Error logging in. Redirecting to Confess.',
    });
  }
}

async function doFirebaseLogout(_, __, { cache, client }) {
  await firebaseApp.auth().signOut();

  persistAuthState(cache, null);
  localStorage.setItem('authState', 'null');
  localStorage.removeItem('selectedCommunityId');
  client.resetStore();

  return {
    code: 'auth/logged_out',
    success: true,
    message: 'Logged out.',
    authState: null,
    __typename: 'LoginResponse',
  };
}

export const authMutationResolvers = {
  attemptLoginWithEmailLink,
  doFirebaseLogout,
};
