import { ApolloCache } from 'apollo-cache';
import { firebaseApp } from '../../services/firebase';

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

const authResolvers = {
  attemptLoginWithEmailLink: async (_, { userEmail, emailLink }, { cache }) => {
    window.localStorage.removeItem('emailForSignIn');

    try {
      const result = await firebaseApp
        .auth()
        .signInWithEmailLink(userEmail!, emailLink);

      // Clear email from storage.

      const idToken = await firebaseApp.auth().currentUser?.getIdToken();
      return {
        code: 200,
        success: true,
        message: 'Successfully logged in.',
      };
    } catch (e) {
      return {
        code: e.code,
        success: false,
        message: 'Error logging in.',
      };
    }
  },
};


export const resolvers = {
  Mutation: {
    ...authResolvers,
  },
};
