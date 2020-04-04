import { firebaseApp } from '../../../services/firebase';
import { ApolloClient, NormalizedCacheObject, ApolloError } from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';
import { GET_LOCAL_USER } from '../localState';

export const queryResolvers = {
  localUser: async (_, __, { cache, client }) => {
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
        },
      });

      return data.data!.user;
    } catch (e) {
      throw new ApolloError({ errorMessage: 'Failed to retrieve user.' });
    }
  },
};
