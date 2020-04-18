import { firebaseApp, firebaseAnalytics } from '../../../services/firebase';
import {
  gql,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';
import { GetUserById, GetUserById_user } from '../../../types/GetUserById';
import { IsSupportedEmailTLD, IsValidEmailFormat } from '../../../utils';
import { GET_LOCAL_USER } from '../localState';

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

function persistLoginInfo(apolloCache, loginInfo) {
  apolloCache.writeQuery({
    query: gql`
      query getLoginInfo {
        loginInfo {
          code
          success
          message
        }
      }
    `,
    data: {
      loginInfo,
    },
  });
}

const supportedSignupFields = ['displayName'];
function isUserMissingFields(userData: GetUserById_user) {
  return supportedSignupFields.some((val) => !userData[val]);
}

async function attemptLogin(_, __, { cache, client }) {
  const apolloClient: ApolloClient<NormalizedCacheObject> = client;
  const currentUser = firebaseApp.auth().currentUser;
  let resp;

  if (!currentUser) {
    persistLoginInfo(cache, null);
    throw new ApolloError({
      errorMessage: 'Error logging in. Redirecting to Confess.',
    });
  }

  // Existing user: let's retrieve data from backend.
  const data = await apolloClient.query<GetUserById>({
    query: GET_USER_BY_ID,
    variables: {
      id: currentUser.uid,
      disableSafeMode: true,
    },
  });

  if (!data.data.user) {
    resp = {
      code: 'auth/new_user',
      success: true,
      message: 'Welcome to Confess! Taking you to the signup page.',
      __typename: 'LoginResponse',
    };
    persistLoginInfo(cache, resp);
    return resp;
  }

  if (isUserMissingFields(data.data.user)) {
    cache.writeQuery({
      query: GET_LOCAL_USER,
      data: { localUser: data.data.user },
    });

    resp = {
      code: 'auth/new_user',
      success: true,
      message: 'Logged in! We just need a bit of info from you!',
      __typename: 'LoginResponse',
    };
    persistLoginInfo(cache, resp);
    return resp;
  }

  if (data.data.user.community?.isEnabled) {
    localStorage.setItem('selectedCommunityId', data.data.user.community.id);
  } else {
    localStorage.setItem('selectedCommunityId', 'O0jkcLwMRy77krkmAT2q');
  }

  firebaseAnalytics.logEvent('login', { method: 'passwordless' });

  resp = {
    code: 'auth/logged_in',
    success: true,
    message: 'Successfully logged in.',
    __typename: 'LoginResponse',
  };
  persistLoginInfo(cache, resp);
  return resp;
}

async function requestFirebaseLoginLink(_, { userEmail }, { cache, client }) {
  firebaseAnalytics.logEvent('login_requested', {
    email: userEmail,
  });

  if (!IsSupportedEmailTLD(userEmail) || !IsValidEmailFormat(userEmail)) {
    throw new ApolloError({
      errorMessage:
        'Invalid Email. Sorry, we only support .ac.nz, .edu.au and .edu emails right now!',
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
  firebaseAnalytics.logEvent('login_attempt', {
    email: userEmail,
  });

  localStorage.removeItem('emailForSignIn');

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
      const resp = {
        code: 'auth/new_user',
        success: true,
        message: "Logged in. Let's take you to the signup page.",
        authState,
        __typename: 'LoginResponse',
      };
      persistLoginInfo(cache, resp);
      return resp;
    }

    return attemptLogin(undefined, undefined, { cache, client });
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

  firebaseAnalytics.logEvent('logout');

  return {
    code: 'auth/logged_out',
    success: true,
    message: 'Logged out.',
    authState: null,
    __typename: 'LoginResponse',
  };
}

export const authMutationResolvers = {
  attemptLogin,
  attemptLoginWithEmailLink,
  requestFirebaseLoginLink,
  doFirebaseLogout,
};
