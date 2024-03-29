import { ForbiddenError } from 'apollo-server-express';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Comment } from '../../typings';
import {
  verifyComment,
  verifyCommunity,
  verifyPost,
  verifyUser,
} from '../common/verification';
import { addIdToDoc } from '../resolvers/utils';
const firestore = firebaseApp.firestore();

async function submitComment(
  _: any,
  { communityId, postId, content },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  const communityMustBeEnabled = !userDoc.data()!.isAdmin;
  await verifyCommunity(communityId, communityMustBeEnabled);

  const newComment: Partial<Comment> = {
    creationTimestamp: moment().unix(),
    authorRef: userRef,
    content,
    totalLikes: 0,
    likeRefs: [],
  };

  const { postRef } = await verifyPost(communityId, postId);
  const commentsRef = postRef.collection('comments');

  // Transaction: Adding comment and updating comment count must be atomic
  const newCommentRef = await firestore.runTransaction((t) =>
    t.get(postRef).then((postDoc) => {
      const newTotalComments = (postDoc.data()?.totalComments || 0) + 1;
      const addedCommentRef = commentsRef.add(newComment);
      t.update(postRef, { totalComments: newTotalComments });
      return Promise.resolve(addedCommentRef);
    })
  );

  newComment.id = newCommentRef.id;

  return {
    code: 200,
    message: `Comment submitted on post ${postId} `,
    success: true,
    comment: newComment,
  };
}

async function toggleLikeComment(
  _: any,
  { communityId, postId, commentId },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  const communityMustBeEnabled = !userDoc.data()!.isAdmin;
  await verifyCommunity(communityId, communityMustBeEnabled);

  const { commentRef, commentDoc } = await verifyComment(
    communityId,
    postId,
    commentId
  );

  const userHasLiked: boolean = (commentDoc.data()! as Comment).likeRefs.some(
    (likeRef) => likeRef.id === userRef.id
  );

  await commentRef.update({
    totalLikes: userHasLiked
      ? admin.firestore.FieldValue.increment(-1)
      : admin.firestore.FieldValue.increment(1),
    likeRefs: userHasLiked
      ? admin.firestore.FieldValue.arrayRemove(userRef)
      : admin.firestore.FieldValue.arrayUnion(userRef),
  });

  // refetch comment for updated values
  const comment = addIdToDoc(await commentRef.get());
  comment.isCommentLikedByUser = !userHasLiked;

  // success
  return {
    code: 200,
    message: 'comment liked.',
    success: true,
    comment,
  };
}

async function toggleStarComment(
  _: any,
  { communityId, postId, commentId },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef, userDoc } = await verifyUser(userRecord);

  const communityMustBeEnabled = !userDoc.data()!.isAdmin;
  await verifyCommunity(communityId, communityMustBeEnabled);

  // verify user is OP
  const { postDoc } = await verifyPost(communityId, postId);
  if (userDoc?.id !== postDoc.data()?.authorRef.id) {
    throw new ForbiddenError('Only original posters can star comments');
  }

  const { commentRef, commentDoc } = await verifyComment(
    communityId,
    postId,
    commentId
  );

  if (userDoc?.id === commentDoc.data()?.authorRef.id) {
    throw new ForbiddenError('You cannot star your own comment');
  }

  const isStarred = commentDoc.data()?.isStarred;

  // star comment
  await commentRef.update({
    isStarred: !isStarred,
  });

  // increment users stars
  const commentAuthorRef = commentDoc.data()?.authorRef;
  await commentAuthorRef.update({
    starCount: isStarred
      ? admin.firestore.FieldValue.increment(-1)
      : admin.firestore.FieldValue.increment(1),
  });

  const userHasLiked: boolean = (commentDoc.data()! as Comment).likeRefs.some(
    (likeRef) => likeRef.id === userRef.id
  );

  // refetch comment for updated values
  const comment = addIdToDoc(await commentRef.get());
  comment.isCommentLikedByUser = userHasLiked;

  // success
  return {
    code: 200,
    message: 'comment starred.',
    success: true,
    comment,
  };
}

export const commentMutations = {
  submitComment,
  toggleLikeComment,
  toggleStarComment,
};
