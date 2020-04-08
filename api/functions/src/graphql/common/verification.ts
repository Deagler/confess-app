import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';

const firestore = firebaseApp.firestore();
const usersCollection = firestore.collection('users');
const communitiesCollection = firestore.collection('communities');

export async function verifyUser(userRecord: UserRecord) {
  if (!userRecord?.email) {
    throw new AuthenticationError('Unauthorised');
  }

  const userRef = usersCollection.doc(userRecord.uid);

  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new UserInputError(`No user document for ${userRecord.uid}`);
  }

  return { userRef, userDoc };
}

export async function verifyCommunity(communityId: string) {
  const communityRef = communitiesCollection.doc(communityId);
  const communityDoc = await communityRef.get();
  if (!communityDoc.exists) {
    throw new UserInputError(`Community with id ${communityId} not found`);
  }

  return { communityRef, communityDoc };
}

export async function verifyPost(communityId: string, postId: string) {
  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const postDoc = await postRef.get();
  if (!postDoc.exists) {
    throw new UserInputError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  return { postRef, postDoc };
}

export async function verifyComment(
  communityId: string,
  postId: string,
  commentId: string
) {
  const commentRef = firestore.doc(
    `/communities/${communityId}/posts/${postId}/comments/${commentId}`
  );
  const commentDoc = await commentRef.get();
  if (!commentDoc.exists) {
    throw new UserInputError(
      `post ${commentId} does't exist in community ${communityId}`
    );
  }
  return { commentRef, commentDoc };
}
