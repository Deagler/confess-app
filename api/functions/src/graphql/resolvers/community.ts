import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Post } from '../../typings';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const communityResolvers = {
  async feed(parent: any, args) {
    try {
      const postQuery = await firestore
        .collection(`communities/${parent.id}/posts`)
        .where('isApproved', '==', true)
        .get();

      const posts: Post[] = postQuery.docs.map(addIdToDoc);

      return posts;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};