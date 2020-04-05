import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';
import { paginateResults } from '../../utils/pagination';
import { verifyUser } from '../common/verification';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const communityResolvers = {
  async feed(parent: any, { sortBy, cursor, limit }) {
    try {
      const postCollection = firestore.collection(
        `communities/${parent.id}/posts`
      );

      const cursorDocument = cursor
        ? await postCollection.doc(cursor).get()
        : undefined;

      const postQuery = postCollection.where(
        'moderationStatus',
        '==',
        ModerationStatus.APPROVED
      );

      const paginationResults = await paginateResults(
        postQuery,
        sortBy,
        cursorDocument,
        limit
      );
      const posts: Post[] = paginationResults.items.map(addIdToDoc);

      return { items: posts, cursor: paginationResults.newCursorDocumentId };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async unapprovedPosts(parent: any, { sortBy, cursor, limit }, context: any) {
    // pull user from request context
    const userRecord: UserRecord = context.req.user;
    const { userDoc } = await verifyUser(userRecord);

    // check moderator is admin
    if (!userDoc.data()!.isAdmin) {
      throw new AuthenticationError('Only administrators can moderate posts');
    }

    try {
      const postCollection = await firestore.collection(
        `communities/${parent.id}/posts`
      );

      const cursorDocument = cursor
        ? await postCollection.doc(cursor).get()
        : undefined;

      const unapprovedPostsQuery = postCollection.where(
        'moderationStatus',
        '==',
        ModerationStatus.PENDING
      );

      const paginationResults = await paginateResults(
        unapprovedPostsQuery,
        sortBy,
        cursorDocument,
        limit
      );

      const unapprovedPosts: Post[] = paginationResults.items.map(addIdToDoc);

      return {
        items: unapprovedPosts,
        cursor: paginationResults.newCursorDocumentId,
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
