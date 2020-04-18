import { IonRow, IonCol, IonLabel, IonAvatar } from '@ionic/react';
import React from 'react';
import { GetLocalUser_localUser } from '../types/GetLocalUser';
import { css } from 'glamor';
import { Tooltip } from '@material-ui/core';

const userDetailContainer = css({ display: 'flex', flex: 1 });

const userInfoContainer = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center',
  color: 'var(--ion-text-color)',
});

const userAvatar = css({
  width: '48px',
  height: '48px',
});

export const LocalUserDetail: React.FC<{
  user: GetLocalUser_localUser;
}> = ({ user }) => {
  return (
    <IonRow>
      <IonCol className="ion-align-items-center ion-align-content-center">
        <div {...userDetailContainer}>
          <IonAvatar {...userAvatar}>
            <img
              alt="user avatar"
              src={
                user.community
                  ? user.community.imageURI
                  : 'https://i.imgur.com/GiOdlWc.png'
              }
            />
          </IonAvatar>

          <div {...userInfoContainer}>
            <IonLabel>
              <strong>{`${user.displayName}`}</strong>
            </IonLabel>
            <Tooltip
              arrow={true}
              disableFocusListener={!!user.community}
              disableHoverListener={!!user.community}
              disableTouchListener={!!user.community}
              title={"We'll be at your university soon!"}
            >
              <IonLabel>
                <strong>
                  {user.community ? user.community.name : user.email}
                </strong>
              </IonLabel>
            </Tooltip>
          </div>
        </div>
      </IonCol>
    </IonRow>
  );
};
