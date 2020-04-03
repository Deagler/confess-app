import { firebaseApp } from '../../../services/firebase';

export const authResolvers = {
  attemptLoginWithEmailLink: async (_, { userEmail, emailLink }, { cache }) => {
    localStorage.removeItem('emailForSignIn');

    if (!firebaseApp.auth().isSignInWithEmailLink(emailLink)) {
      return {
        code: 400,
        success: false,
        message: 'Error logging in. Redirecting to Confess.',
        __typename: 'LoginResponse',
      };
    }
    try {
      await firebaseApp.auth().signInWithEmailLink(userEmail!, emailLink);

      const idToken = await firebaseApp.auth().currentUser?.getIdToken();

      cache.writeData({
        data: {
          authState: {
            accessToken: idToken,
            __typename: 'AuthState',
          },
          __typename: 'Query',
        },
      });

      // localStorage.setItem(
      //   'authState',
      //   JSON.stringify({
      //     accessToken: idToken,
      //     __typename: 'AuthState',
      //   })
      // );

      return {
        code: 200,
        success: true,
        message: 'Successfully logged in.',
        authState: {
          accessToken: idToken,
          __typename: 'AuthState',
        },
        __typename: 'LoginResponse',
      };
    } catch (e) {
      return {
        code: e.code,
        success: false,
        message: 'Error logging in. Redirecting to Confess.',
        __typename: 'LoginResponse',
      };
    }
  },
};
