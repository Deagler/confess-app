import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';
import { verifyUser } from '../common/verification';
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
  async unapprovedPosts(parent: any, args, context: any) {
    // pull user from request context
    const userRecord: UserRecord = context.req.user;
    const { userDoc } = await verifyUser(userRecord);

    // check moderator is admin
    if (!userDoc.data()!.isAdmin) {
      throw new AuthenticationError('Only administrators can moderate posts');
    }

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
