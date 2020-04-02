import React, { useState, useEffect } from 'react';

import {
  IonPage,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/react';

import { RouteComponentProps } from 'react-router';

import './Page.css';
import { firebaseApp } from '../services/firebase';
import { IsValidEmailFormat } from '../utils';
import { SubmittableEmailInput } from '../components/SubmittableEmailInput';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LoggingInCardContent: React.FC = () => {
  return (
    <IonCardContent>
      <IonCardTitle>Logging in...</IonCardTitle>
      <IonSpinner />
    </IonCardContent>
  );
};

const EmailInputCardContent: React.FC<any> = ({
  email,
  setEmail,
  loading,
  submit,
}) => {
  return (
    <IonCardContent>
      <SubmittableEmailInput
        email={email}
        setEmail={setEmail}
        placeholderText="Enter your university e-mail again."
        submitText="Login"
        submit={submit}
        loading={loading}
      />
    </IonCardContent>
  );
};

export const ATTEMPT_LOGIN_WITH_EMAIL_LINK = gql`
  mutation AttemptLogin($userEmail: String!, $emailLink: String!) {
    attemptLoginWithEmailLink(userEmail: $userEmail, emailLink: $emailLink)
      @client {
      code
      success
      message
    }
  }
`;

const AuthCallbackPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [attemptLoginMutation, attemptLoginInfo] = useMutation(
    ATTEMPT_LOGIN_WITH_EMAIL_LINK
  );

  const [loginError, setLoginError] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();

  const attemptLogin = () => {
    const emailLink = window.location.href;

    attemptLoginMutation({
      variables: {
        userEmail,
        emailLink,
      },
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('emailForSignIn')) {
      return;
    }

    attemptLogin();
  }, []);

  return (
    <IonPage>
      <IonCard>
        {!localStorage.getItem('emailForSignIn') ? (
          <EmailInputCardContent
            email={userEmail}
            setEmail={setUserEmail}
            loading={attemptLoginInfo.loading}
            submit={attemptLogin}
          />
        ) : (
          <LoggingInCardContent />
        )}
      </IonCard>
    </IonPage>
  );
};

export default AuthCallbackPage;
