import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Community, Post } from '../../typings';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const queryResolvers = {
  async post(_: null, args: { communityId: string; postId: string }) {
    try {
      const post = await firestore
        .doc(`communities/${args.communityId}/posts/${args.postId}`)
        .get();

      return addIdToDoc(post) as Post | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async community(_: null, args: { id: string }) {
    try {
      const community = await firestore.doc(`communities/${args.id}`).get();

      return addIdToDoc(community) as Community | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async communities() {
    try {
      const communityQuery = await firestore.collection(`communities`).get();

      const communities: Community[] = communityQuery.docs.map(addIdToDoc);

      return communities;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
