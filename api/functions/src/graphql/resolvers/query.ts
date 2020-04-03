import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Comment, CommentsInput, Community, Post, User } from '../../typings';
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
  async user(_: null, args: { id: string }) {
    try {
      const user = await firestore.doc(`users/${args.id}`).get();

      return addIdToDoc(user) as User | undefined;
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
  async comments(_: null, args: CommentsInput) {
    try {
      const commentsCollection = firestore.collection(
        `communities/${args.communityId}/posts/${args.postId}/comments`
      );

      let commentsQuery = commentsCollection
        .orderBy(
          args.sortBy?.property || 'totalLikes',
          args.sortBy?.direction || 'desc'
        )
        .limit(args.limit || 10);

      // if request has cursor, update query to retrieve items beyond the cursor
      if (args.cursor) {
        const lastComment = await commentsCollection.doc(args.cursor).get();
        commentsQuery = commentsQuery.startAfter(lastComment);
      }

      const queryResults = await commentsQuery.get();

      // if there are no more documents return an empty list and the previous cursor
      if (queryResults.empty) {
        return { items: [], cursor: args.cursor };
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
