import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const communityResolvers = {
  async feed(parent: any, args) {
    try {
      const postQuery = await firestore
        .collection(`communities/${parent.id}/posts`)
        .where('moderationStatus', '==', ModerationStatus.APPROVED)
        .get();

      const posts: Post[] = postQuery.docs.map(addIdToDoc);

      return posts;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async unapprovedPosts(parent: any, args) {
    try {
      const unapprovedPostsQuery = await firestore
        .collection(`communities/${parent.id}/posts`)
        .where('moderationStatus', '==', ModerationStatus.PENDING)
        .get();

      const unapprovedPosts: Post[] = unapprovedPostsQuery.docs.map(addIdToDoc);

      return unapprovedPosts;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
