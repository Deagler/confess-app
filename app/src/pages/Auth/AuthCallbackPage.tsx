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
import { ATTEMPT_LOGIN_WITH_EMAIL_LINK } from '../../common/graphql/auth';
import { authPageCSS, authCenterCardCSS } from './authCSS';
import { AttemptLoginWithEmailLink } from '../../types/AttemptLoginWithEmailLink';
import { firebaseAnalytics } from '../../services/firebase';

enum LOGIN_CARD_STATE {
  SHOW_LOGGING_IN,
  SHOW_LOGIN_SUCCESS,
  SHOW_ELICIT_EMAIL,
  SHOW_SIGNUP_REDIRECT,
  SHOW_ERROR,
}

const AuthCallbackPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [userEmail, setUserEmail] = useState<string>(
    localStorage.getItem('emailForSignIn')!
  );

  const [loginCardState, setLoginCardState] = useState<LOGIN_CARD_STATE>(
    LOGIN_CARD_STATE.SHOW_LOGGING_IN
  );
  const [attemptLoginMutation, attemptLoginInfo] = useMutation<
    AttemptLoginWithEmailLink
  >(ATTEMPT_LOGIN_WITH_EMAIL_LINK, {
    onCompleted: (loginData) => {
      const data = loginData?.attemptLoginWithEmailLink;
      if (!data) return;

      if (data!.success) {
        if (loginData?.attemptLoginWithEmailLink?.code != 'auth/new_user') {
          setLoginCardState(LOGIN_CARD_STATE.SHOW_LOGIN_SUCCESS);
          setTimeout(navigateToFeed, 2000);
        } else {
          setLoginCardState(LOGIN_CARD_STATE.SHOW_SIGNUP_REDIRECT);
          setTimeout(navigateToSignupPage, 2000);
        }
      }
    },
    onError: (err) => {
      setLoginCardState(LOGIN_CARD_STATE.SHOW_ERROR);
      navigateToFeed();
    },
  });

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
      console.error(e);
      firebaseAnalytics.logEvent('exception', {
        description: e,
      });
    }
  };

  const attemptLoginCallback = useCallback(attemptLogin, []);

  useEffect(() => {
    if (!localStorage.getItem('emailForSignIn')) {
      setLoginCardState(LOGIN_CARD_STATE.SHOW_ELICIT_EMAIL);
      return;
    }

    attemptLoginCallback();
  }, [attemptLoginCallback]);

  return (
    <IonPage {...css(backgroundColor, authPageCSS)}>
      <div className="ion-text-center">
        <h4 className="ion-padding-top">You're almost in!</h4>
        <IonCard {...authCenterCardCSS}>
          {renderAppropriateLoginCard(
            loginCardState,
            attemptLoginInfo,
            attemptLogin,
            userEmail,
            setUserEmail
          )}
        </IonCard>
      </div>
    </IonPage>
  );
};

export default AuthCallbackPage;

const renderAppropriateLoginCard = (
  cardState: LOGIN_CARD_STATE,
  attemptLoginInfo,
  attemptLogin,
  userEmail,
  setUserEmail
): JSX.Element => {
  switch (cardState) {
    case LOGIN_CARD_STATE.SHOW_LOGGING_IN:
      return <StatusTextCardContent status="Logging in..." />;
    case LOGIN_CARD_STATE.SHOW_ELICIT_EMAIL:
      return (
        <EmailInputCardContent
          email={userEmail}
          setEmail={setUserEmail}
          loading={attemptLoginInfo.loading}
          submit={attemptLogin}
        />
      );
    case LOGIN_CARD_STATE.SHOW_LOGIN_SUCCESS:
      return <LoginSuccessCard />;
    case LOGIN_CARD_STATE.SHOW_SIGNUP_REDIRECT:
      return (
        <StatusTextCardContent status="We need some info from you. Redirecting you to the signup page." />
      );
    case LOGIN_CARD_STATE.SHOW_ERROR:
      return (
        <StatusTextCardContent status="Failed to login :( Taking you to Confess" />
      );
  }
};

const StatusTextCardContent: React.FC<{ status: string }> = ({ status }) => {
  return (
    <IonCardContent>
      <IonCardTitle>{status}</IonCardTitle>
      <IonSpinner />
    </IonCardContent>
  );
};

export const LoginSuccessCard: React.FC = () => {
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
        placeholderText="Enter your university e-mail again"
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
