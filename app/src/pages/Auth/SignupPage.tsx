import { RouteComponentProps } from 'react-router';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import React, { useState } from 'react';
import { css } from 'glamor';
import { backgroundColor } from '../../theme/global';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AttemptSignup } from '../../types/AttemptSignup';
import { ATTEMPT_SIGNUP } from '../../common/graphql/auth';
import { GET_LOCAL_USER } from '../../common/graphql/localState';
import { authPageCSS, authCenterCardCSS } from './authCSS';
import { navigateToFeed } from './AuthCallbackPage';
import { GetLocalUser } from '../../types/GetLocalUser';

const SignupCardContent: React.FC<{ mutationInfo; submit }> = ({
  mutationInfo,
  submit,
}) => {
  const [displayName, setDisplayName] = useState<string>();
  return (
    <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonInput
              style={{ maxWidth: '400px', minWidth: '250px' }}
              placeholder={'Enter a display name.'}
              value={displayName}
              onIonChange={(e) => setDisplayName(e.detail.value!)}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              disabled={!displayName}
              onClick={() => submit(displayName)}
              fill="solid"
            >
              {mutationInfo.loading ? <IonSpinner /> : 'Signup'}
            </IonButton>
          </IonCol>
        </IonRow>
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
        setTimeout(() => {
          const communityId = data.attemptSignUp?.user?.community
            ? data.attemptSignUp.user.community.id
            : 'O0jkcLwMRy77krkmAT2q';
          localStorage.setItem('selectedCommunityId', communityId);

          navigateToFeed(communityId);
        }, 2000);
      },
    }
  );

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    variables: {
      disableSafeMode: true,
    },
    fetchPolicy: 'no-cache',
  });
  console.log('localUser');
  console.log(localUserQuery);
  return (
    <IonPage {...css(backgroundColor, authPageCSS)}>
      <div className="ion-text-center">
        <h4 className="ion-padding-top">You're almost in!</h4>
        <IonCard {...authCenterCardCSS}>
          {
            <SignupCardContent
              mutationInfo={attemptSignupInfo}
              submit={async (displayName) => {
                try {
                  await attemptSignupMutation({
                    variables: { displayName },
                  });
                } catch (e) {
                  navigateToFeed();
                }
              }}
            />
          }
        </IonCard>
      </div>
    </IonPage>
  );
};

export default SignUpPage;
