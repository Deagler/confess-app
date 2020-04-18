import { firebaseApp } from '../../../services/firebase';
import { ApolloClient, NormalizedCacheObject, ApolloError } from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';

export const queryResolvers = {
  localUser: async (_, { disableSafeMode }, { cache, client }) => {
    if (!firebaseApp.auth().currentUser) {
      return null;
    }
    const currentUser = firebaseApp.auth().currentUser!;
    const apolloClient: ApolloClient<NormalizedCacheObject> = client;

    try {
      const data = await apolloClient.query({
        query: GET_USER_BY_ID,
        variables: {
          id: currentUser.uid,
          disableSafeMode,
        },
        fetchPolicy: 'no-cache',
      });

      return data.data!.user;
    } catch (e) {
      throw new ApolloError({ errorMessage: 'Failed to retrieve user.' });
    }
  },
};
