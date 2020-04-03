import { ApolloError } from 'apollo-server-express';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';

const firestore = firebaseApp.firestore();
const communitiesCollection = firestore.collection('communities');

async function submitPostForApproval(
  _: any,
  { communityId, channel, title, content, authorAlias }
) {
  // TODO:
  // Pull AuthorId from context.req
  // verify user exists in the community
  // validate channel for the community

  const communityDoc = communitiesCollection.doc(communityId);
  const communityPosts = communityDoc.collection('posts');

  const newPost: Partial<Post> = {
    creationTimestamp: moment().unix(),
    title,
    content,
    channel,
    authorAlias,
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
