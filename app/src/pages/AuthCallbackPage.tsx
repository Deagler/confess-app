import React from 'react';

import { IonPage } from '@ionic/react';

import { RouteComponentProps } from 'react-router';

import './Page.css';
import { firebaseApp } from '../services/firebase';

const AuthCallbackPage: React.FC<RouteComponentProps> = ({ history }) => {
  if (firebaseApp.auth().isSignInWithEmailLink(window.location.href)) {
    let email = localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    firebaseApp
      .auth()
      .signInWithEmailLink(email!, window.location.href)
      .then(function (result) {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        console.log(result);
      })
      .catch(function (error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
  return <IonPage></IonPage>;
};

export default AuthCallbackPage;
