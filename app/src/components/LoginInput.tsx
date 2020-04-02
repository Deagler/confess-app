import { useState } from 'react';
import { firebaseApp } from '../services/firebase';
import {
  IonRow,
  IonInput,
  IonButton,
  IonToast,
  IonSpinner,
  IonCol,
  IonLabel,
} from '@ionic/react';
import React from 'react';
import { Checkmark } from 'react-checkmark';
import { SubmittableEmailInput } from './SubmittableEmailInput';

export enum LOGIN_STATUS {
  NONE,
  PENDING,
  SUCCESS,
  FAILED,
}

const LoginSuccess: React.FC<{}> = () => {
  return (
    <IonRow className="ion-justify-content-center">
      <IonCol size="1" className="ion-padding">
        <Checkmark size="medium" />
      </IonCol>
      <IonCol size="9" className="ion-padding ion-text-center">
        <IonLabel>Click the link in your e-mail to login!</IonLabel>
      </IonCol>
    </IonRow>
  );
};

export const LoginInput: React.FC<{}> = () => {
  const [loginEmail, setLoginEmail] = useState<string>();
  const [loginStatus, setLoginStatus] = useState<LOGIN_STATUS>(
    LOGIN_STATUS.NONE
  );
  const [loginError, setLoginError] = useState<string>();

  const handleLogin = async (loginEmail) => {
    const actionCodeSettings = {
      // URL must be whitelisted in the Firebase Console.
      url: `${window.location.origin}/callback`,
      handleCodeInApp: true,
    };
    try {
      setLoginStatus(LOGIN_STATUS.PENDING);
      await firebaseApp
        .auth()
        .sendSignInLinkToEmail(loginEmail, actionCodeSettings);
      setLoginStatus(LOGIN_STATUS.SUCCESS);
      localStorage.setItem('emailForSignIn', loginEmail);
    } catch (e) {
      setLoginError(
        'An error occurred while logging in. Our team has been notified.'
      );
      setLoginEmail('');
      setLoginStatus(LOGIN_STATUS.FAILED);
    }
  };

  return loginStatus == LOGIN_STATUS.SUCCESS ? (
    <LoginSuccess />
  ) : (
    <React.Fragment>
      <IonToast isOpen={!!loginError} message={loginError} duration={2000} />
      <SubmittableEmailInput
        email={loginEmail}
        setEmail={setLoginEmail}
        placeholderText="Enter your university e-mail"
        loading={loginStatus == LOGIN_STATUS.PENDING}
        submit={handleLogin}
        submitText="Login"
      />
    </React.Fragment>
  );
};
