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

import { RouteComponentProps, Redirect } from 'react-router';

import './Page.css';
import { firebaseApp } from '../services/firebase';
import { IsValidEmailFormat } from '../utils';
import { SubmittableEmailInput } from '../components/SubmittableEmailInput';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Checkmark } from 'react-checkmark';

const LoggingInCardContent: React.FC = () => {
  return (
    <IonCardContent>
      <IonCardTitle>Logging in...</IonCardTitle>
      <IonSpinner />
    </IonCardContent>
  );
};

const LoginSuccessCard: React.FC = () => {
  return (
    <IonCardContent>
      <Checkmark size="medium" />
      <IonCardTitle>Logged in! Taking you to Confess.</IonCardTitle>
    </IonCardContent>
  );
};

const LoginErrorCard: React.FC = () => {
  return (
    <IonCardContent>
      <IonCardTitle>Failed to login :( Taking you to Confess.</IonCardTitle>
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
  const [userEmail, setUserEmail] = useState<string>(
    localStorage.getItem('emailForSignIn')!
  );

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

  const renderAppropriateLoginCard = () => {
    if (attemptLoginInfo.called) {
      if (attemptLoginInfo.loading) {
        return <LoggingInCardContent />;
      }

      if (attemptLoginInfo.data && attemptLoginInfo.data.success) {
        return (
          <React.Fragment>
            <Redirect to="/page/posts" />
            <LoginSuccessCard />
          </React.Fragment>
        );
      }

      if (
        attemptLoginInfo.error ||
        (attemptLoginInfo.data && !attemptLoginInfo.data.success)
      ) {
        return (
          <React.Fragment>
            <Redirect to="/page/posts" />
            <LoginErrorCard />
          </React.Fragment>
        );
      }
    }

    return !localStorage.getItem('emailForSignIn') ? (
      <EmailInputCardContent
        email={userEmail}
        setEmail={setUserEmail}
        loading={attemptLoginInfo.loading}
        submit={attemptLogin}
      />
    ) : (
      <LoggingInCardContent />
    );
  };

  return (
    <IonPage>
      <IonCard>{renderAppropriateLoginCard()}</IonCard>
    </IonPage>
  );
};

export default AuthCallbackPage;
