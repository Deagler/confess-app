import { useState } from 'react';
import { IonToast, IonLabel } from '@ionic/react';
import React from 'react';
import { Checkmark } from 'react-checkmark';
import { SubmittableEmailInput } from './SubmittableEmailInput';
import { css } from 'glamor';
import { useMutation } from '@apollo/react-hooks';
import { REQUEST_FIREBASE_LOGIN_LINK } from '../common/auth';
import { RequestFirebaseLink } from '../types/RequestFirebaseLink';
import { firebaseAnalytics } from '../services/firebase';

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
  const [requestFirebaseLink, requestInfo] = useMutation<RequestFirebaseLink>(
    REQUEST_FIREBASE_LOGIN_LINK
  );
  const [loginError, setLoginError] = useState<string>();
  const handleLogin = async (inputEmail) => {
    try {
      await requestFirebaseLink({ variables: { userEmail: inputEmail } });
    } catch (e) {
      setLoginEmail('');
      setLoginError(e.message);
      firebaseAnalytics.logEvent('exception', {
        description: `login_input/${e.message}`,
      });
    }
  };

  return !requestInfo.loading &&
    requestInfo.data?.requestFirebaseLoginLink?.success ? (
    <LoginSuccess />
  ) : (
    <React.Fragment>
      <IonToast isOpen={!!loginError} message={loginError} duration={2000} />
      <SubmittableEmailInput
        email={loginEmail}
        setEmail={setLoginEmail}
        placeholderText="Enter your university e-mail"
        loading={requestInfo.loading}
        submit={handleLogin}
        submitText="Login"
      />
    </React.Fragment>
  );
};
