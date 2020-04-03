import { css } from 'glamor';
import { IonSpinner } from '@ionic/react';
import React from 'react';

const loadingContainer = css({
  display: 'flex',
  width: '100wh',
  height: '100vh',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

const largeSpinner = css({
  width: '64px',
  height: '64px',
});

export const FullPageLoader: React.FC = () => {
  return (
    <div {...loadingContainer}>
      <IonSpinner {...largeSpinner} />
    </div>
  );
};
