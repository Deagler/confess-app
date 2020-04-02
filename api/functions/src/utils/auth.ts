// verification middleware

import { firebaseApp } from '../firebase';

// injects firebase user information into express request param
export const attachFirebaseIdToken = async (req, res, next) => {
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'development') {
    console.log('Access Token Added');
    req.headers.authorization = `Bearer ${process.env.LOCAL_ACCESS_TOKEN}`;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    //read token from auth header
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    console.log('No token attached');
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
    res.status(403).send({
      code: 401,
      success: false,
      message: 'Failed to authorise user. Our team has been notified. '+error.code,
    })
    return;
  }
};
