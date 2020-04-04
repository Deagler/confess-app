import { ApolloError } from 'apollo-server-express';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Post } from '../../typings';

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
    isApproved: false,
    approvalInfo: null,
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

async function approvePost(_: any, { communityId, postId, approverId }) {
  // verify approver
  const approverRef = firestore.doc(`/users/${approverId}`);
  const approver = await approverRef.get();
  if (!approver.exists) {
    throw new ApolloError(`user with id ${approverId} doesn't exist`);
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
    isApproved: true,
    approvalInfo: {
      approver: approverRef,
      approvalTimestamp: moment().unix(),
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
  toggleLikePost,
};
