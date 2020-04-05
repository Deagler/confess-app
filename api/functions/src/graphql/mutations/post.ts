import { AuthenticationError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { ModerationStatus, Post } from '../../typings';
import {
  verifyCommunity,
  verifyPost,
  verifyUser,
} from '../common/verification';

async function submitPostForApproval(
  _: any,
  { communityId, channel, title, content, authorAlias },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  // can only post to your own community
  if (userDoc.data()!.communityRef.id !== communityId) {
    throw new AuthenticationError(
      'Forbidden: you can only post to your own community'
    );
  }

  const { communityRef } = await verifyCommunity(communityId);

  // TODO: verify channel exists in community

  const communityPosts = communityRef.collection('posts');

  const newPost: Partial<Post> = {
    creationTimestamp: moment().unix(),
    title,
    content,
    channel,
    authorAlias,
    authorRef: userRef,
    moderationStatus: ModerationStatus.PENDING,
    moderationInfo: null,
    totalComments: 0,
    totalLikes: 0,
    likeRefs: [],
  };
  const newPostRef = communityPosts.doc();
  await newPostRef.set(newPost);
  newPost.id = newPostRef.id;

  return {
    code: 200,
    message: 'Post submitted for approval.',
    success: true,
    post: newPost,
  };
}

async function approvePost(_: any, { communityId, postId }, context: any) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  // check moderator is admin
  if (!userDoc.data()!.isAdmin) {
    throw new AuthenticationError('Only administrators can moderate posts');
  }

  const { postRef } = await verifyPost(communityId, postId);

  // update post
  const patch = {
    moderationStatus: ModerationStatus.APPROVED,
    moderationInfo: {
      moderator: userRef,
      lastUpdated: moment().unix(),
    },
  };
  await postRef.update(patch);

  // success
  return {
    code: 200,
    message: 'Post approved.',
    success: true,
  };
}

async function rejectPost(
  _: any,
  { communityId, postId, reason },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  // check moderator is admin
  if (!userDoc.data()!.isAdmin) {
    throw new AuthenticationError('Only administrators can moderate posts');
  }

  const { postRef } = await verifyPost(communityId, postId);

  // update post
  const patch = {
    moderationStatus: ModerationStatus.REJECTED,
    moderationInfo: {
      moderator: userRef,
      lastUpdated: moment().unix(),
      reason,
    },
  };
  await postRef.update(patch);

  // success
  return {
    code: 200,
    message: 'Post rejected.',
    success: true,
  };
}

async function toggleLikePost(_: any, { communityId, postId }) {
  // verify user
  // verify post

  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const post = await postRef.get();

  if (!post.exists) {
    throw new ApolloError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  const userId = 'v3uyCOqsJxdJQ9yATdcv5SnM1Sf2';
  const userRef = firestore.doc(`users/${userId}`);

  const userHasLiked = await (post.data()! as Post).likeRefs.includes(userRef);

  await postRef.update({
    totalLikes: userHasLiked
      ? FirebaseFirestore.FieldValue.increment(-1)
      : FirebaseFirestore.FieldValue.increment(1),
    likeRefs: userHasLiked
      ? FirebaseFirestore.FieldValue.arrayRemove(userRef)
      : FirebaseFirestore.FieldValue.arrayUnion(userRef),
  });

  // success
  return {
    code: 200,
    message: 'Post approved.',
    success: true,
    post: await postRef.get(),
  };
}

export const postMutations = {
  submitPostForApproval,
  approvePost,
  rejectPost,
  toggleLikePost,
};
