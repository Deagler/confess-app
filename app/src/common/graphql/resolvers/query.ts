import { firebaseApp } from '../../../services/firebase';
import { ApolloClient, NormalizedCacheObject, ApolloError } from 'apollo-boost';
import { GET_USER_BY_ID } from '../users';
import { GET_COMMUNITY_BY_ID } from '../communities';
import { GET_SELECTED_COMMUNITY_ID } from '../localState';

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
  selectedCommunity: async (_parent: any, _args: any, { cache, client }) => {
    try {
      // retrieve community id from cache
      const idQuery = await client.query({
        query: GET_SELECTED_COMMUNITY_ID,
      });

      const communityId: string = idQuery.data.selectedCommunityId;

      if (!communityId) {
        return null;
      }

      // query community data from server
      const communityQuery = await client.query({
        query: GET_COMMUNITY_BY_ID,
        variables: {
          communityId,
        },
      });

      return communityQuery.data.community;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
