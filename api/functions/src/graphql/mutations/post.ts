import { ForbiddenError, UserInputError } from 'apollo-server-express';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { ModerationStatus, Post } from '../../typings';
import {
  verifyCommunity,
  verifyPost,
  verifyUser,
} from '../common/verification';
import { addIdToDoc } from '../resolvers/utils';

const firestore = firebaseApp.firestore();

async function submitPostForApproval(
  _: any,
  { communityId, channelId, title, content, authorAlias },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  // can only post to your own community
  if (userDoc.data()!.communityRef.id !== communityId) {
    throw new ForbiddenError('You can only post to your own community');
  }

  const communityMustBeEnabled = !userDoc.data()!.isAdmin;
  const { communityRef } = await verifyCommunity(
    communityId,
    communityMustBeEnabled
  );

  // TODO: verify channel exists in community

  const communityPosts = communityRef.collection('posts');

  const newPost: Partial<Post> = {
    creationTimestamp: moment().unix(),
    title,
    content,
    channelId,
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
    throw new ForbiddenError('Only administrators can moderate posts');
  }

  const { communityRef } = await verifyCommunity(communityId, false);
  const { postRef } = await verifyPost(communityId, postId);

  // update post
  const patch = {
    moderationStatus: ModerationStatus.APPROVED,
    moderationInfo: {
      moderator: userRef,
      lastUpdated: moment().unix(),
    },
  };

  await firestore.runTransaction((t) =>
    t
      .getAll<FirebaseFirestore.DocumentData>(postRef, communityRef)
      .then((docs) => {
        const postDoc = docs[0];
        const communityDoc = docs[1];

        if (postDoc.data()?.moderationStatus !== ModerationStatus.PENDING) {
          throw new UserInputError(
            `post ${postRef.id} has already been moderated`
          );
        }

        t.set(
          postRef,
          { postNumber: communityDoc.data()?.totalApprovedPosts + 1 },
          { merge: true }
        );
        t.update(communityRef, {
          totalApprovedPosts: admin.firestore.FieldValue.increment(1),
        });
        t.update(postRef, patch);
        return Promise.resolve();
      })
  );

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
    throw new ForbiddenError('Only administrators can moderate posts');
  }

  await verifyCommunity(communityId, false);
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

  await firestore.runTransaction((t) =>
    t.get(postRef).then((postDoc) => {
      if (postDoc.data()?.moderationStatus !== ModerationStatus.PENDING) {
        throw new UserInputError(
          `post ${postRef.id} has already been moderated`
        );
      }
      t.update(postRef, patch);
      return Promise.resolve();
    })
  );

  // success
  return {
    code: 200,
    message: 'Post rejected.',
    success: true,
  };
}

async function toggleLikePost(_: any, { communityId, postId }, context) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  const communityMustBeEnabled = !userDoc.data()!.isAdmin;
  await verifyCommunity(communityId, communityMustBeEnabled);
  const { postRef, postDoc } = await verifyPost(communityId, postId);

  const userHasLiked = (postDoc.data()! as Post).likeRefs.some(
    (likeRef) => likeRef.id == userRef.id
  );

  await postRef.update({
    totalLikes: userHasLiked
      ? admin.firestore.FieldValue.increment(-1)
      : admin.firestore.FieldValue.increment(1),
    likeRefs: userHasLiked
      ? admin.firestore.FieldValue.arrayRemove(userRef)
      : admin.firestore.FieldValue.arrayUnion(userRef),
  });

  const postData = addIdToDoc(await postRef.get());
  postData.isLikedByUser = !userHasLiked;

  // success
  return {
    code: 200,
    message: 'Post liked.',
    success: true,
    post: postData,
  };
}

export const postMutations = {
  submitPostForApproval,
  approvePost,
  rejectPost,
  toggleLikePost,
};
