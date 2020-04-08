import React, { useState } from 'react';
import { IonButton, IonIcon, IonToast } from '@ionic/react';
import { shareSocial } from 'ionicons/icons';

export interface ShareButtonProps {
  target: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ target }) => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const host: string = window.location.host;

  return (
    <>
      <IonToast
        isOpen={toastVisible}
        message={`${host}${target}`}
        duration={2000}
        onDidDismiss={() => setToastVisible(false)}
      />
      <IonButton
        fill="clear"
        expand="full"
        color="primary"
        onClick={() => setToastVisible(true)}
      >
        <IonIcon icon={shareSocial} />
      </IonButton>
    </>
  );
};

export default ShareButton;
