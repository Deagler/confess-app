// verification middleware

import { ForbiddenError } from 'apollo-server-express';
import { firebaseApp } from '../firebase';

let mockCachedToken;

async function getMockIdToken(uid) {
  if (!uid) {
    console.error('No UID Specified - have you set LOCAL_MOCK_USER?');
    return undefined;
  }

  if (!mockCachedToken) {
    try {
      const user = await firebaseApp.auth().getUser(uid);

      mockCachedToken = {
        iss: 'https://securetoken.google.com/confess-api',
        aud: 'confess-api',
        auth_time: -1,
        user_id: user.uid,
        sub: user.uid,
        iat: -1,
        exp: -1,
        email: user.email,
        email_verified: user.emailVerified,
        firebase: user.providerData,
        uid: user.uid,
      };
    } catch (e) {
      console.log('unable to mock token');
      return undefined;
    }
  }

  return mockCachedToken;
}

// injects firebase user information into express request param
export const attachFirebaseIdToken = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // read token from auth header
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    console.log('No token attached');
    if (process.env.NODE_ENV == 'development') {
      // Add Mock token in dev environment
      const mockIdtoken = await getMockIdToken(process.env.LOCAL_MOCK_USER);
      console.log(`Return Mock Id Token for user ${mockIdtoken?.email}`);
      req.user = mockIdtoken;
    }
    next();
    return;
  }

  try {
    const decodedIdToken = await firebaseApp.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying attached Firebase ID token', error);
    throw new ForbiddenError(
      'Failed to authorise user. Our team has been notified'
    );
  }
};
