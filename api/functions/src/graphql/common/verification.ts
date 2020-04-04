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
