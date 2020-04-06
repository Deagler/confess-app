import { useState } from 'react';
import { firebaseApp } from '../services/firebase';
import { IonToast, IonLabel } from '@ionic/react';
import React from 'react';
import { Checkmark } from 'react-checkmark';
import { SubmittableEmailInput } from './SubmittableEmailInput';
import { css } from 'glamor';

export enum LOGIN_STATUS {
  NONE,
  PENDING,
  SUCCESS,
  FAILED,
}

const successLabel = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const LoginSuccess: React.FC<{}> = () => {
  return (
    <div {...successLabel}>
      <Checkmark size="medium" />
      <IonLabel>Click the link in your e-mail to login!</IonLabel>
    </div>
  );
};

export const LoginInput: React.FC<{}> = () => {
  const [loginEmail, setLoginEmail] = useState<string>();
  const [loginStatus, setLoginStatus] = useState<LOGIN_STATUS>(
    LOGIN_STATUS.NONE
  );
  const [loginError, setLoginError] = useState<string>();
  const handleLogin = async (inputEmail) => {
    const actionCodeSettings = {
      // URL must be whitelisted in the Firebase Console.
      url: `${window.location.origin}/callback`,
      handleCodeInApp: true,
    };

    try {
      setLoginStatus(LOGIN_STATUS.PENDING);
      await firebaseApp
        .auth()
        .sendSignInLinkToEmail(inputEmail, actionCodeSettings);
      setLoginStatus(LOGIN_STATUS.SUCCESS);
      localStorage.setItem('emailForSignIn', inputEmail);
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
