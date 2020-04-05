import { ApolloError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { Comment, CommentsInput, Post } from '../../typings';
import { paginateResults } from '../../utils/pagination';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const postResolvers = {
  async comments(parent: any, { sortBy, cursor, limit }: CommentsInput) {
    try {
      const commentsCollection = firestore.collection(
        `communities/${parent.communityId}/posts/${parent.id}/comments`
      );

      const cursorDocument = cursor
        ? await commentsCollection.doc(cursor).get()
        : undefined;

      const paginationResults = await paginateResults(
        commentsCollection,
        sortBy,
        cursorDocument,
        limit
      );

      const comments: Comment[] = paginationResults.items.map(addIdToDoc);

      return { items: comments, cursor: paginationResults.newCursorDocumentId };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async isLikedByUser(parent: any, _, context) {
    // pull user from request context
    const userRecord: UserRecord = context.req.user;

    if (!userRecord) {
      return false;
    }

    const postData: Post = parent;
    if (!parent.likeRefs) {
      return false;
    }
    const userHasLiked = await postData.likeRefs.some(
      (likeRef) => likeRef.id == userRecord.uid
    );

    return userHasLiked;
  },
};
