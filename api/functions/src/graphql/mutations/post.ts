import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';

const firestore = firebaseApp.firestore();
const communitiesCollection = firestore.collection('communities');
const usersCollection = firestore.collection('users');

async function submitPostForApproval(
  _: any,
  { communityId, channel, title, content, authorAlias },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  console.log(userRecord);

  if (!userRecord?.email) {
    console.log(userRecord.email);
    throw new AuthenticationError('Unauthorised');
  }

  const userRef = usersCollection.doc(userRecord.uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new ApolloError(`No user document for ${userRecord.uid}`);
  }

  // can only post to your own community
  if (userDoc.data()!.community.id !== communityId) {
    throw new AuthenticationError(
      'Forbidden: you can only post to your own community'
    );
  }

  // verify community
  const communityRef = communitiesCollection.doc(communityId);
  const communityDoc = await communityRef.get();
  if (!communityDoc.exists) {
    throw new ApolloError(`Community with id ${userRecord.uid} not found`);
  }

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
    likes: [],
    comments: [],
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

async function approvePost(_: any, { communityId, postId, moderatorId }) {
  // verify moderator
  const moderatorRef = firestore.doc(`/users/${moderatorId}`);
  const moderator = await moderatorRef.get();
  if (!moderator.exists) {
    throw new ApolloError(`user with id ${moderatorId} doesn't exist`);
  }

  // verify post
  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const post = await postRef.get();
  if (!post.exists) {
    throw new ApolloError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  // update post
  const patch = {
    moderationStatus: ModerationStatus.APPROVED,
    moderationInfo: {
      moderator: moderatorRef,
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
  { communityId, postId, moderatorId, reason }
) {
  // verify moderator
  const moderatorRef = firestore.doc(`/users/${moderatorId}`);
  const moderator = await moderatorRef.get();
  if (!moderator.exists) {
    throw new ApolloError(`user with id ${moderatorId} doesn't exist`);
  }

  // verify post
  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const post = await postRef.get();
  if (!post.exists) {
    throw new ApolloError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  // update post
  const patch = {
    moderationStatus: ModerationStatus.REJECTED,
    moderationInfo: {
      moderator: moderatorRef,
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

export const postMutations = {
  submitPostForApproval,
  approvePost,
  rejectPost,
};
