import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import React from 'react';
import { chatbox } from 'ionicons/icons';
import { appLogo } from '../styles/app';

export const AppLogo: React.FC<{}> = () => {
  return (
    <IonItem {...appLogo} slot="start" lines="none">
      <IonIcon icon={chatbox} color="primary" size="large" />
      <IonLabel style={{ fontSize: '24px' }}>Confess</IonLabel>
    </IonItem>
  );
};
