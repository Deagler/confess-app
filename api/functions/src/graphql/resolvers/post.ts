import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Comment, CommentsInput } from '../../typings';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const postResolvers = {
  async comments(parent: any, { sortBy, cursor, limit }: CommentsInput) {
    try {
      const commentsCollection = firestore.collection(
        `communities/${parent.communityId}/posts/${parent.id}/comments`
      );

      let commentsQuery = commentsCollection
        .orderBy(sortBy?.property || 'totalLikes', sortBy?.direction || 'desc')
        .limit(limit || 10);

      // if request has cursor, update query to retrieve items beyond the cursor
      if (cursor) {
        const lastComment = await commentsCollection.doc(cursor).get();
        commentsQuery = commentsQuery.startAfter(lastComment);
      }

      const queryResults = await commentsQuery.get();

      // if there are no more documents return an empty list and the previous cursor
      if (queryResults.empty) {
        return { items: [], cursor };
      }

      // document id of the final comment is used for the pagination cursor
      const nextCursor = queryResults.docs[queryResults.docs.length - 1].ref.id;

      const comments: Comment[] = queryResults.docs.map(addIdToDoc);

      return { items: comments, cursor: nextCursor };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
