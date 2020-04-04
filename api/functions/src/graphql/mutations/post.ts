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

async function toggleLikePost(_: any, { communityId, postId, isLikedByUser }) {
  // verify user
  // verify post
  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const post = await postRef.get();
  if (!post.exists) {
    throw new ApolloError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  await firestore.runTransaction((t) =>
    t.get(postRef).then((postDoc) => {
      let newTotalLikes;
      if (!isLikedByUser) {
        newTotalLikes = (postDoc.data()?.totalLikes || 0) + 1;
      } else {
        newTotalLikes = (postDoc.data()?.totalLikes || 0) - 1;
      }
      t.update(postRef, { totalLikes: newTotalLikes });
      // postDoc.data()?.likes.push(); here: how do i pass user type in? and how do i check if the user is connected to network
      return Promise.resolve(postRef);
    })
  );

  // success
  return {
    code: 200,
    message: 'Post approved.',
    success: true,
  };
}

export const postMutations = {
  submitPostForApproval,
  approvePost,
  toggleLikePost,
};
