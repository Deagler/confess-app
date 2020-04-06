import { css } from 'glamor';
import { IonSpinner } from '@ionic/react';
import React from 'react';
import { offWhiteCSS } from '../theme/global';

const loadingContainer = css(
  {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  offWhiteCSS
);

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
