import moment from 'moment';
import { firebaseApp } from '../../firebase';
import { Comment, User } from '../../typings';
import { addIdToDoc } from '../resolvers/utils';

const firestore = firebaseApp.firestore();
const communitiesCollection = firestore.collection('communities');
const usersCollection = firestore.collection('users');

async function submitComment(_: any, { communityId, postId, content }) {
  // TODO:
  // - Retrieve author from user context
  // - Validate post exists
  // - Maybe we can retrieve the communityId from context as well
  //   (communityId is needed as we cant query across subcollections)
  const authorRef = usersCollection.doc('aVyC8BFy1f5qGzXVwGSu');

  const newComment: Partial<Comment> = {
    creationTimestamp: moment().unix(),
    authorRef,
    content,
    totalLikes: 0,
    likes: [],
  };

  const postRef = communitiesCollection
    .doc(communityId)
    .collection('posts')
    .doc(postId);
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

  // Update author to User type because it is needed for the API response
  const authorSnapshot = await authorRef.get();
  const authorWithId = addIdToDoc(authorSnapshot) as User | undefined;
  newComment.author = authorWithId;

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
