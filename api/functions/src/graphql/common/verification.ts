import { ApolloError, AuthenticationError } from 'apollo-server-express';
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
    throw new ApolloError(`No user document for ${userRecord.uid}`);
  }

  return { userRef, userDoc };
}

export async function verifyCommunity(communityId: string) {
  const communityRef = communitiesCollection.doc(communityId);
  const communityDoc = await communityRef.get();
  if (!communityDoc.exists) {
    throw new ApolloError(`Community with id ${communityId} not found`);
  }

  return { communityRef, communityDoc };
}

export async function verifyPost(communityId: string, postId: string) {
  const postRef = firestore.doc(`/communities/${communityId}/posts/${postId}`);
  const postDoc = await postRef.get();
  if (!postDoc.exists) {
    throw new ApolloError(
      `post ${postId} does't exist in community ${communityId}`
    );
  }

  return { postRef, postDoc };
}
