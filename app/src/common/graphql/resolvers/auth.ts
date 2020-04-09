import { firebaseApp } from '../../../services/firebase';
import {
  gql,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';
import { GetUserById } from '../../../types/GetUserById';
import { IsSupportedEmailTLD, IsValidEmailFormat } from '../../../utils';

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

async function requestFirebaseLoginLink(_, { userEmail }, { cache, client }) {
  if (!IsSupportedEmailTLD(userEmail) || !IsValidEmailFormat(userEmail)) {
    throw new ApolloError({
      errorMessage:
        'Invalid Email. Sorry, we only support .ac.nz and .edu.au emails right now!',
    });
  }

  const actionCodeSettings = {
    // URL must be whitelisted in the Firebase Console.
    url: `${window.location.origin}/callback`,
    handleCodeInApp: true,
  };

  try {
    await firebaseApp
      .auth()
      .sendSignInLinkToEmail(userEmail, actionCodeSettings);

    localStorage.setItem('emailForSignIn', userEmail);
    return {
      code: 'auth/link_requested',
      success: true,
      message: 'Click the link in your e-mail to sign in!',
      __typename: 'MutationResponse',
    };
  } catch (e) {
    throw new ApolloError({
      errorMessage:
        'An error occurred while logging in. Our team has been notified.',
    });
  }
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
      localStorage.setItem('selectedCommunityId', data.data.user.community.id);
    } else {
      localStorage.setItem('selectedCommunityId', 'HW6lY4kJOpqSpL39hbUV');
    }

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

async function doFirebaseLogout(_, __, { cache, client }) {
  await firebaseApp.auth().signOut();

  persistAuthState(cache, null);
  localStorage.setItem('authState', 'null');
  localStorage.removeItem('selectedCommunityId')
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
  requestFirebaseLoginLink,
  doFirebaseLogout,
};
