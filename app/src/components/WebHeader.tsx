import { IonToolbar, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import React from 'react';
import { css } from 'glamor';
import { LoginInput } from './LoginInput';
import { AppLogo } from './AppLogo';
import { useShouldBlockMenu } from '../utils/menus';
import { LocalUserDetail } from './LocalUserDetail';
import { useQuery } from '@apollo/react-hooks';
import { GetLocalUser } from '../types/GetLocalUser';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { LogoutButton } from './LogoutButton';
import { backgroundColor } from '../theme/global';

const webHeader = css(
  {
    width: '100%',
    height: '80px',
    WebKitShadow: '0 4px 6px -6px #222',
    MozBoxShadow: '0 4px 6px -6px #222',
    boxShadow: '0 4px 6px -6px #222',
    zIndex: 100,
  },
  backgroundColor
);

const loginInputContainer = css({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  width: '100%',
  alignItems: 'center',
  zIndex: 100,
});

const spinnerContainer = css({
  height: '100%',
  width: '250px',
  zIndex: 9999999,
});

export const WebHeader: React.FC<{}> = () => {
  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;

  const shouldBlockMenu = useShouldBlockMenu();
  if (shouldBlockMenu) {
    return null;
  }

  return (
    <div className="ion-hide-lg-down" {...webHeader}>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonToolbar>
              <AppLogo />
            </IonToolbar>
          </IonCol>
          <IonCol size="8">
            <div {...loginInputContainer}>
              {localUserQuery.loading || !localUserQuery.called ? (
                <div
                  {...spinnerContainer}
                  className="ion-text-center ion-justify-content-center ion-padding"
                >
                  <IonSpinner />
                </div>
              ) : localUserQuery.data?.localUser ? (
                <LocalUserDetail user={localUserQuery.data?.localUser} />
              ) : (
                <LoginInput />
              )}
              {userLoggedIn && <LogoutButton showText={false} />}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
