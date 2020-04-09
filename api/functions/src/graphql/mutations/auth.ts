import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { User } from '../../typings';
import { addIdToDoc } from '../resolvers/utils';

const usersCollection = firebaseApp.firestore().collection('users');
const communitiesCollection = firebaseApp.firestore().collection('communities');

/** Temporary until Auth is moved to Serverside completely. */
const supportedEmailTLDS = ['.ac.nz', '.edu.au', '.edu'];
function IsSupportedEmailTLD(emailToValidate: string): boolean {
  if (!emailToValidate) {
    return false;
  }
  return supportedEmailTLDS.some((TLD) =>
    emailToValidate.endsWith(TLD.toLowerCase())
  );
}

async function attemptSignUp(_: any, { firstName, lastName }, context: any) {
  const userRecord: UserRecord = context.req.user;

  if (!userRecord || !userRecord.email) {
    throw new AuthenticationError('Unauthorised');
  }

  const userDoc = usersCollection.doc(userRecord.uid);
  if ((await userDoc.get()).exists) {
    throw new UserInputError('Account already exists');
  }

  if (!IsSupportedEmailTLD(userRecord.email)) {
    throw new UserInputError(
      'Sorry! We only support .ac.nz, .edu.au and .edu emails right now.'
    );
  }

  const communityInfo = userRecord.email.split('@');
  const communityUsername = communityInfo[0];
  const emailDomain = communityInfo[1];

  const communityDoc = await communitiesCollection
    .where('domains', 'array-contains', emailDomain)
    .get();

  const newUserData: Partial<User> = {
    communityUsername,
    firstName,
    lastName,
    email: userRecord.email,
    communityRef: null,
  };

  if (!communityDoc.empty) {
    newUserData.communityRef = communityDoc.docs[0].ref;
  }

  try {
    await userDoc.set(newUserData);
    newUserData.id = userDoc.id;
    newUserData.community = !communityDoc.empty
      ? addIdToDoc(communityDoc.docs[0])
      : null;

    return {
      code: 200,
      success: true,
      message: 'Succesfully registered!',
      user: newUserData,
    };
  } catch (e) {
    console.error(e);
    throw new ApolloError(
      'Unable to register user. Our team has been notified'
    );
  }
}

export const authResolvers = {
  attemptSignUp,
};
