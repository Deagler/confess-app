import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { User } from '../../typings';
import { validateDisplayName } from '../common/validation';
const usersCollection = firebaseApp.firestore().collection('users');
const communitiesCollection = firebaseApp.firestore().collection('communities');

async function getCommunityForEmailDomain(emailDomain) {
  const communityDoc = await communitiesCollection
    .where('domains', 'array-contains', emailDomain)
    .get();

  return !communityDoc.empty ? communityDoc.docs[0].ref : null;
}

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

async function attemptSignUp(_: any, args, context: any) {
  const displayName: string = args.displayName;
  const userRecord: UserRecord = context.req.user;

  if (!userRecord || !userRecord.email) {
    throw new AuthenticationError('Unauthorised');
  }

  const userDoc = usersCollection.doc(userRecord.uid);

  if (!IsSupportedEmailTLD(userRecord.email)) {
    throw new UserInputError(
      'Sorry! We only support .ac.nz, .edu.au and .edu emails right now.'
    );
  }
  await validateDisplayName(displayName);

  const communityInfo = userRecord.email.split('@');
  const communityUsername = communityInfo[0];
  const emailDomain = communityInfo[1];

  const newUserData: Partial<User> = {
    communityUsername,
    displayName,
    displayNameId: displayName.toLowerCase(),
    email: userRecord.email,
    communityRef: await getCommunityForEmailDomain(emailDomain),
  };

  try {
    await userDoc.set(newUserData, { merge: true });
    newUserData.id = userDoc.id;

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
