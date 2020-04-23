import sgMail from '@sendgrid/mail';
import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-express';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';
import { User } from '../../typings';
import { IsSupportedEmailTLD, IsValidEmailFormat } from '../../utils/emails';

import { validateDisplayName } from '../common/validation';
const usersCollection = firebaseApp.firestore().collection('users');
const communitiesCollection = firebaseApp.firestore().collection('communities');
const CALLBACK_ORIGIN = functions.config().confess.appurl;
const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sgMail.setApiKey(SENDGRID_API_KEY);

async function getCommunityForEmailDomain(emailDomain) {
  const communityDoc = await communitiesCollection
    .where('domains', 'array-contains', emailDomain)
    .get();

  return !communityDoc.empty ? communityDoc.docs[0].ref : null;
}

async function requestFirebaseLoginLink(_: any, { userEmail }, context: any) {
  if (!IsSupportedEmailTLD(userEmail) || !IsValidEmailFormat(userEmail)) {
    throw new ApolloError(
      'Invalid Email. Sorry, we only support .ac.nz, .edu.au and .edu emails right now!'
    );
  }

  try {
    const authLink = await firebaseApp
      .auth()
      .generateSignInWithEmailLink(userEmail, {
        url: `${CALLBACK_ORIGIN}callback`,
        handleCodeInApp: true,
      });

    await sendEmailToUser(userEmail, authLink);

    return {
      code: 'auth/link_requested',
      success: true,
      message: 'Click the link in your e-mail to sign in!',
      __typename: 'MutationResponse',
    };
  } catch (e) {
    console.error(e);
    throw new ApolloError(
      'An error occurred while logging in. Our team has been notified.'
    );
  }
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
  requestFirebaseLoginLink,
};

async function sendEmailToUser(userEmail, authLink) {
  const msg = {
    to: userEmail,
    from: { name: 'Confess', email: 'noreply@confess.co.nz' },
    subject: 'Sign in to Confess',
    templateId: 'd-88f3d6540df64002af065a1790051330',
    dynamicTemplateData: {
      userEmail,
      authLink,
    },
  };
  await sgMail.send(msg);
}
