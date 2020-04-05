import { ApolloError } from 'apollo-server-express';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Comment } from '../../typings';
import { verifyPost, verifyUser } from '../common/verification';
import { addIdToDoc } from '../resolvers/utils';
const firestore = firebaseApp.firestore();

async function submitComment(
  _: any,
  { communityId, postId, content },
  context: any
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef } = await verifyUser(userRecord);

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
  context
) {
  // pull user from request context
  const userRecord: UserRecord = context.req.user;
  const { userRef } = await verifyUser(userRecord);

  const commentRef = firestore.doc(
    `/communities/${communityId}/posts/${postId}/comments/${commentId}`
  );
  const comment = await commentRef.get();

  if (!comment.exists) {
    throw new ApolloError(
      `comment ${commentId} does't exist in post ${postId} of community ${communityId}`
    );
  }

  const userHasLiked = await (comment.data()! as Comment).likeRefs.some(
    (likeRef) => likeRef.id == userRef.id
  );

  await commentRef.update({
    totalLikes: userHasLiked
      ? admin.firestore.FieldValue.increment(-1)
      : admin.firestore.FieldValue.increment(1),
    likeRefs: userHasLiked
      ? admin.firestore.FieldValue.arrayRemove(userRef)
      : admin.firestore.FieldValue.arrayUnion(userRef),
  });

  const commentData = addIdToDoc(await commentRef.get());
  commentData.isCommentLikedByUser = !userHasLiked;

  // success
  return {
    code: 200,
    message: 'comment liked.',
    success: true,
    comment: commentData,
  };
}

export const commentMutations = {
  submitComment,
  toggleLikeComment,
};
