import { UserRecord } from 'firebase-functions/lib/providers/auth';
import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Comment } from '../../typings';
import {
  verifyPost,
  verifyUser,
} from '../common/verification';

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
    likes: [],
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

export const commentMutations = {
  submitComment,
};
