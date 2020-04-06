import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React from 'react';
import { css } from 'glamor';
import { LoginInput } from './LoginInput';
import { AppLogo } from './AppLogo';
import { findByLabelText } from '@testing-library/react';
import { useShouldBlockMenu } from '../utils/menus';

const webHeader = css({
  width: '100%',
  height: '80px',
  WebKitShadow: '0 4px 6px -6px #222',
  MozBoxShadow: '0 4px 6px -6px #222',
  boxShadow: '0 4px 6px -6px #222',
  zIndex: 9999999,
});



const loginInputContainer = css({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  width: '100%',
});

export const WebHeader: React.FC<{}> = () => {
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
              <LoginInput />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
