import { ForbiddenError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';
import { paginateResults } from '../../utils/pagination';
import { verifyUser, verifyCommunity } from '../common/verification';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const communityResolvers = {
  async feed(parent: any, { sortBy, cursor, limit, channelId }, context: any) {
    const userRecord: UserRecord = context.req.user;
    let communityMustBeEnabled = true;

    if (userRecord) {
      const { userRef, userDoc } = await verifyUser(userRecord);
      communityMustBeEnabled = !userDoc.data()!.isAdmin;
    }
    
    await verifyCommunity(parent.id, communityMustBeEnabled);

    const postCollection = firestore.collection(
      `communities/${parent.id}/posts`
    );

    const cursorDocument = cursor
      ? await postCollection.doc(cursor).get()
      : undefined;

    let postQuery = postCollection.where(
      'moderationStatus',
      '==',
      ModerationStatus.APPROVED
    );
    if (channelId) {
      postQuery = postQuery.where('channelId', '==', channelId);
    }

    const paginationResults = await paginateResults(
      postQuery,
      sortBy,
      cursorDocument,
      limit
    );
    const posts: Post[] = paginationResults.items.map(addIdToDoc);

    return { items: posts, cursor: paginationResults.newCursorDocumentId };
  },
  async unapprovedPosts(parent: any, { sortBy, cursor, limit }, context: any) {
    // pull user from request context
    const userRecord: UserRecord = context.req.user;
    const { userDoc } = await verifyUser(userRecord);

    // check moderator is admin
    if (!userDoc.data()!.isAdmin) {
      throw new ForbiddenError('Only administrators can moderate posts');
    }

    const postCollection = firestore.collection(
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
  },
};
