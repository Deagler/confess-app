import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Community, Post, User } from '../../typings';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const queryResolvers = {
  async post(_: null, args: { communityId: string; postId: string }) {
    try {
      const post = await firestore
        .doc(`communities/${args.communityId}/posts/${args.postId}`)
        .get();

      if (!post.exists) {
        throw new ApolloError(
          `post ${args.postId} does't exist in community ${args.communityId}`
        );
      }

      const postWithId = addIdToDoc(post) as Post;
      postWithId.communityId = args.communityId;
      return postWithId;
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
};
