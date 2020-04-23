import { RouteComponentProps } from 'react-router';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import React, { useState } from 'react';
import { css } from 'glamor';
import { backgroundColor } from '../../theme/global';
import { useMutation } from '@apollo/react-hooks';
import { AttemptSignup } from '../../types/AttemptSignup';
import { ATTEMPT_SIGNUP } from '../../common/graphql/auth';
import { GET_LOCAL_USER } from '../../common/graphql/localState';
import { authPageCSS, authCenterCardCSS } from './authCSS';
import { navigateToFeed, LoginSuccessCard } from './AuthCallbackPage';
import { TextField } from '@material-ui/core';
import { firebaseAnalytics } from '../../services/firebase';

const SignupCardContent: React.FC<{ mutationInfo; submit }> = ({
  mutationInfo,
  submit,
}) => {
  const [displayName, setDisplayName] = useState<string>();
  const [revalidate, setRevalidate] = useState<boolean>();
  function handleEnterDisplayName(e) {
    setDisplayName(e.target.value);
    setRevalidate(true);
  }
  return (
    <IonCardContent>
      <IonGrid>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(displayName);
            setRevalidate(false);
          }}
        >
          <IonRow>
            <IonCol>
              <TextField
                id="input"
                error={revalidate ? undefined : !!mutationInfo.error?.message}
                helperText={
                  revalidate ? undefined : mutationInfo.error?.message
                }
                variant="outlined"
                label={'Enter a display name'}
                value={displayName}
                style={{ maxWidth: '400px', minWidth: '250px' }}
                onChange={handleEnterDisplayName}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                disabled={!displayName || mutationInfo.loading}
                fill="solid"
                type="submit"
              >
                {mutationInfo.loading ? <IonSpinner /> : 'Signup'}
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonGrid>
    </IonCardContent>
  );
};

const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
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
      onCompleted: (data) => {
        if (data?.attemptSignUp?.success == true) {
          setTimeout(() => {
            const communityId = data.attemptSignUp?.user?.community
              ? data.attemptSignUp.user.community.id
              : 'O0jkcLwMRy77krkmAT2q';
            localStorage.setItem('selectedCommunityId', communityId);

            navigateToFeed(communityId);
          }, 2000);
        }
      },
    }
  );

  return (
    <IonPage {...css(backgroundColor, authPageCSS)}>
      <div className="ion-text-center">
        <h4 className="ion-padding-top">You're almost in!</h4>
        <IonCard {...authCenterCardCSS}>
          {attemptSignupInfo.data?.attemptSignUp?.success ? (
            <LoginSuccessCard />
          ) : (
            <SignupCardContent
              mutationInfo={attemptSignupInfo}
              submit={async (displayName) => {
                try {
                  await attemptSignupMutation({
                    variables: { displayName },
                  });
                } catch (e) {
                  firebaseAnalytics.logEvent('exception', {
                    description: `signup_page/${e.message}`,
                  });
                }
              }}
            />
          )}
        </IonCard>
      </div>
    </IonPage>
  );
};

export default SignUpPage;
