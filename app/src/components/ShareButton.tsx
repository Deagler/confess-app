import React, { useState } from 'react';
import { IonButton, IonIcon, IonToast } from '@ionic/react';
import { shareSocial } from 'ionicons/icons';
import { firebaseAnalytics } from '../services/firebase';

export interface ShareButtonProps {
  title: string;
  target: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, target }) => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const host: string = window.location.host;

  const url: string = `https://${host}${target}`;

  const handleShare = () => {
    // not supported by desktop browsers or language servers yet :(
    const navigator = window.navigator as any;

    if (navigator.share) {
      navigator.share({
        title: `Confess: ${title}`,
        text: 'Check out this confession',
        url: target, // webshare will automatically append host
      });
      firebaseAnalytics.logEvent('share', {
        method: 'web_share',
        content_type: 'post',
        content_id: url,
      });
    } else {
      // copy link to clipboard
      // no nice way to do this
      const dummyInput = document.createElement('input');
      document.body.appendChild(dummyInput);
      dummyInput.setAttribute('value', url);
      dummyInput.select();
      document.execCommand('copy');
      document.body.removeChild(dummyInput);
      firebaseAnalytics.logEvent('share', {
        method: 'clipboard',
        content_type: 'post',
        content_id: url,
      });
      setToastVisible(true);
    }
  };

  return (
    <>
      <IonToast
        isOpen={toastVisible}
        message={'Share link copied to clipboard'}
        duration={2000}
        onDidDismiss={() => setToastVisible(false)}
      />
      <IonButton
        data-testid="share-button"
        fill="clear"
        expand="full"
        color="primary"
        onClick={handleShare}
      >
        <IonIcon icon={shareSocial} />
      </IonButton>
    </>
  );
};

export default ShareButton;
