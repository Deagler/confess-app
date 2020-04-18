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
import { useMutation } from '@apollo/react-hooks';
import { Checkmark } from 'react-checkmark';
import { backgroundColor } from '../../theme/global';
import { css } from 'glamor';
import { AttemptLogin } from '../../types/AttemptLogin';
import { ATTEMPT_LOGIN_WITH_EMAIL_LINK } from '../../common/graphql/auth';
import { authPageCSS, authCenterCardCSS } from './authCSS';
import { AttemptLoginWithEmailLink } from '../../types/AttemptLoginWithEmailLink';

const StatusTextCardContent: React.FC<{ status: string }> = ({ status }) => {
  return (
    <IonCardContent>
      <IonCardTitle>{status}</IonCardTitle>
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

export const navigateToFeed = (communityId?) => {
  setTimeout(() => {
    const navCommunity =
      communityId ||
      localStorage.getItem('selectedCommunityId') ||
      'O0jkcLwMRy77krkmAT2q';

    if (navCommunity != localStorage.getItem('selectedCommunityId')) {
      localStorage.setItem('selectedCommunityId', navCommunity); // temp hack for community state issue.
    }

    window.location.href = `/${navCommunity}/posts`;
  }, 2000);
};

const navigateToSignupPage = () => {
  window.location.href = `/signup`;
};


const AuthCallbackPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [attemptLoginMutation, attemptLoginInfo] = useMutation<AttemptLoginWithEmailLink>(
    ATTEMPT_LOGIN_WITH_EMAIL_LINK,
    {
      onCompleted: (data) => {
        if (data?.attemptLoginWithEmailLink?.code != 'auth/new_user') {
          setTimeout(navigateToFeed, 2000);
        } else {
          setTimeout(navigateToSignupPage, 2000);
        }
      },
    }
  );

  const [userEmail, setUserEmail] = useState<string>(
    localStorage.getItem('emailForSignIn')!
  );

  const attemptLogin = async () => {
    const emailLink = window.location.href;
    try {
      await attemptLoginMutation({
        variables: {
          userEmail,
          emailLink,
        },
      });
    } catch (e) {
      navigateToFeed();
    }
  };

  const attemptLoginCallback = useCallback(attemptLogin, []);

  useEffect(() => {
    if (!localStorage.getItem('emailForSignIn')) {
      return;
    }

    attemptLoginCallback();
  }, [attemptLoginCallback]);

  const renderAppropriateLoginCard = () => {
    if (attemptLoginInfo.loading) {
      return <StatusTextCardContent status="Logging in..." />;
    }

    if (attemptLoginInfo.called) {
      const data = attemptLoginInfo.data?.attemptLoginWithEmailLink;

      if (data && data.success) {
        if (data.code == 'auth/new_user') {
          return (
            <StatusTextCardContent status="We need some info from you. Redirecting to signup page." />
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
            <StatusTextCardContent status="Failed to login :( Taking you to Confess." />
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
      <StatusTextCardContent status="Logging in..." />
    );
  };

  return (
    <IonPage {...css(backgroundColor, authPageCSS)}>
      <div className="ion-text-center">
        <h4 className="ion-padding-top">You're almost in!</h4>
        <IonCard {...authCenterCardCSS}>{renderAppropriateLoginCard()}</IonCard>
      </div>
    </IonPage>
  );
};

export default AuthCallbackPage;
