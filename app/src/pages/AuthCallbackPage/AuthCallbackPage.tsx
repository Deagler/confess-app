import React, { useState, useEffect, useCallback } from 'react';

import {
  IonPage,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
} from '@ionic/react';

import { RouteComponentProps } from 'react-router';

import { SubmittableEmailInput } from '../../components/SubmittableEmailInput';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Checkmark } from 'react-checkmark';
import { GET_LOCAL_USER } from '../../common/graphql/localState';
import { backgroundColor } from '../../theme/global';
import { css } from 'glamor';
import { SignupCardContent } from './SignupCardContent';
import { AttemptLogin } from '../../types/AttemptLogin';
import { AttemptSignup } from '../../types/AttemptSignup';

const callbackPageCSS = css({
  height: '100vh',
  width: '100wh',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

const loginCard = css({
  maxWidth: '500px',
  minWidth: '250px',
  padding: '16px',
  minHeight: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column',
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
      <Checkmark size="large" />
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
  const [attemptLoginMutation, attemptLoginInfo] = useMutation<AttemptLogin>(
    ATTEMPT_LOGIN_WITH_EMAIL_LINK,
    {
      onCompleted: (data) => {
        if (data?.attemptLoginWithEmailLink?.code != 'auth/new_user') {
          setTimeout(() => {
            // TODO: pull this state from the signup flow
            const communityId = 'HW6lY4kJOpqSpL39hbUV';
            window.location.href = `/${communityId}/posts`;
          }, 2000);
        }
      },
    }
  );

  const [attemptSignupMutation, attemptSignupInfo] = useMutation<AttemptSignup>(
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
      onCompleted: () => {
        setTimeout(() => {
          // TODO: pull this state from the signup flow
          const communityId = 'HW6lY4kJOpqSpL39hbUV';
          window.location.href = `/${communityId}/posts`;
        }, 2000);
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
            <SignupCardContent
              mutationInfo={attemptSignupInfo}
              submit={(firstName, lastName) => {
                attemptSignupMutation({ variables: { firstName, lastName } });
              }}
            />
          );
        } else {
          return (
            <React.Fragment>
              <LoginSuccessCard />
            </React.Fragment>
          );
        }
      }

      if (attemptLoginInfo.error || (data && !data.success)) {
        return (
          <React.Fragment>
            <LoginErrorCard />
          </React.Fragment>
        );
      }
    }

    if (
      attemptSignupInfo.called &&
      attemptSignupInfo.data?.attemptSignUp?.success
    ) {
      return (
        <React.Fragment>
          <LoginSuccessCard />
        </React.Fragment>
      );
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
    <IonPage {...css(backgroundColor, callbackPageCSS)}>
      <div className="ion-text-center">
        <h4 className="ion-padding-top">You're almost in!</h4>
        <IonCard {...loginCard}>{renderAppropriateLoginCard()}</IonCard>
      </div>
    </IonPage>
  );
};

export default AuthCallbackPage;
