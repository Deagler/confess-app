import { firebaseApp } from '../../firebase';
import { Comment, Community, Post, User } from '../../typings';
import {
  verifyComment,
  verifyCommunity,
  verifyPost,
} from '../common/verification';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const queryResolvers = {
  async post(_: null, args: { communityId: string; postId: string }) {
    const { postDoc } = await verifyPost(args.communityId, args.postId);

    const postWithId = addIdToDoc(postDoc) as Post;
    postWithId.communityId = args.communityId;
    return postWithId;
  },
  async user(_: null, args: { id: string }) {
    const user = await firestore.doc(`users/${args.id}`).get();

    return addIdToDoc(user) as User | undefined;
  },
  async community(_: null, args: { id: string }) {
    const { communityDoc } = await verifyCommunity(args.id);

    return addIdToDoc(communityDoc) as Community | undefined;
  },
  async communities() {
    const communityQuery = await firestore.collection(`communities`).get();

    const communities: Community[] = communityQuery.docs.map(addIdToDoc);
    return communities;
  },
  async comment(
    _: null,
    args: { communityId: string; postId: string; commentId: string }
  ) {
    const { commentDoc } = await verifyComment(
      args.communityId,
      args.postId,
      args.commentId
    );

    const commentWithId = addIdToDoc(commentDoc) as Comment;
    commentWithId.postId = args.postId;
    commentWithId.communityId = args.communityId;
    return commentWithId;
  },
  async landingPosts() {
    const landingPostsQuery = await firestore.collection('landingPosts').get();

    const landingPosts: Post[] = landingPostsQuery.docs.map(addIdToDoc);
    return landingPosts;
  },
};
