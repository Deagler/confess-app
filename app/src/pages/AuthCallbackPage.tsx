import React, { useState, useEffect, useCallback } from 'react';

import {
  IonPage,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonAlert,
  IonTitle,
  IonLabel,
} from '@ionic/react';

import { RouteComponentProps, Redirect } from 'react-router';

import './Page.css';
import { SubmittableEmailInput } from '../components/SubmittableEmailInput';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Checkmark } from 'react-checkmark';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { appPageCSS, offWhiteCSS } from '../theme/global';
import { css } from 'glamor';

const callbackPageCSS = css({
  height: '100vh',
  width: '100wh',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

const loginCard = css({
  maxWidth: '400px',
});

const ATTEMPT_LOGIN_WITH_EMAIL_LINK = gql`
  mutation AttemptLogin($userEmail: String!, $emailLink: String!) {
    attemptLoginWithEmailLink(userEmail: $userEmail, emailLink: $emailLink)
      @client {
      code
      success
      message
    }
  }
`;

const ATTEMPT_SIGNUP = gql`
  mutation AttemptSignup($firstName: String!, $lastName: String!) {
    attemptSignUp(firstName: $firstName, lastName: $lastName) {
      code
      success
      message
      user {
        id
        firstName
        lastName
        communityUsername
        email
        community {
          id
          name
          abbreviation
        }
      }
    }
  }
`;

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

const AuthCallbackPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [attemptLoginMutation, attemptLoginInfo] = useMutation(
    ATTEMPT_LOGIN_WITH_EMAIL_LINK
  );

  const [attemptSignupMutation, attemptSignupInfo] = useMutation(
    ATTEMPT_SIGNUP,
    {
      update: (cache, result) => {
        if (result.data?.attemptSignUp?.success) {
          const user = result.data.attemptSignUp.user;
          cache.writeQuery({
            query: GET_LOCAL_USER,
            data: { localUser: user },
          });
        }
      },
    }
  );

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

  const attemptLoginCallback = useCallback(attemptLogin, []);

  useEffect(() => {
    if (!localStorage.getItem('emailForSignIn')) {
      return;
    }

    attemptLoginCallback();
  }, [attemptLoginCallback]);

  const renderAppropriateLoginCard = () => {
    if (attemptLoginInfo.loading || attemptSignupInfo.loading) {
      return <LoggingInCardContent />;
    }

    if (attemptLoginInfo.called) {
      const data = attemptLoginInfo.data?.attemptLoginWithEmailLink;

      if (data && data.success && !attemptSignupInfo.called) {
        if (data.code == 'auth/new_user') {
          return (
            <IonAlert
              isOpen={true}
              header={'Signup Dialog'}
              backdropDismiss={false}
              inputs={[
                {
                  name: 'firstName',
                  type: 'text',
                  placeholder: 'Your first name.',
                },
                {
                  name: 'lastName',
                  type: 'text',
                  placeholder: 'Your last name.',
                },
              ]}
              buttons={[
                {
                  text: 'Submit',
                  handler: async (formDat) => {
                    if (formDat.firstName && formDat.lastName) {
                      await attemptSignupMutation({
                        variables: { ...formDat },
                      });

                      history.replace('/page/posts');
                    }
                  },
                },
              ]}
            />
          );
        } else {
          return (
            <React.Fragment>
              <Redirect to="/page/posts" />
              <LoginSuccessCard />
            </React.Fragment>
          );
        }
      }

      if (attemptLoginInfo.error || (data && !data.success)) {
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
    <IonPage {...css(offWhiteCSS, callbackPageCSS)}>
      <div className="ion-text-center">
        <IonCard {...loginCard}>
          <IonCardTitle className="ion-padding-top">You're almost in!</IonCardTitle>
          {renderAppropriateLoginCard()}
        </IonCard>
      </div>
    </IonPage>
  );
};

export default AuthCallbackPage;
