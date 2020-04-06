import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import React from 'react';
import { chatbox } from 'ionicons/icons';
import { css } from 'glamor';

const appLogoCSS = css({
  backgroundColor: 'transparent',
  '--background': 'transparent',
});

export const AppLogo: React.FC<any> = () => {
  return (
    <IonItem {...appLogoCSS} slot="start" lines="none">
      <IonIcon icon={chatbox} color="primary" size="large" />
      <IonLabel style={{ fontSize: '24px' }}>Confess</IonLabel>
    </IonItem>
  );
};
