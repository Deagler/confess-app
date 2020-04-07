import { IonRow, IonCol, IonLabel, IonAvatar, IonNote } from '@ionic/react';
import React from 'react';
import { GetLocalUser_localUser } from '../types/GetLocalUser';
import { css } from 'glamor';

const userDetailContainer = css({ display: 'flex', flex: 1 });

const userInfoContainer = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center',
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
          {user.community && (
            <IonAvatar {...userAvatar}>
              <img alt="user avatar" src={user.community.imageURI} />
            </IonAvatar>
          )}
          <div {...userInfoContainer}>
            <IonLabel>
              <strong>{`${user.firstName} ${user.lastName}`}</strong>
            </IonLabel>
            <IonLabel>
              <strong>
                {user.community ? user.community.name : user.email}
              </strong>
            </IonLabel>
          </div>
        </div>
      </IonCol>
      {!user.community && (
        <IonRow>
          <IonNote>
            <em>We'll be at your university soon!</em>
          </IonNote>
        </IonRow>
      )}
    </IonRow>
  );
};
