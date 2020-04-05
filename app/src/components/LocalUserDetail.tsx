import { IonRow, IonCol, IonLabel, IonAvatar } from '@ionic/react';
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
  padding: '10px',
});

export const LocalUserDetail: React.FC<{
  user: GetLocalUser_localUser;
}> = ({ user }) => {
  return (
    <IonRow>
      <IonCol className="ion-align-items-center ion-align-content-center ion-padding">
        <div {...userDetailContainer}>
          <IonAvatar>
            <img
              alt="user avatar"
              src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
            />
          </IonAvatar>
          <div {...userInfoContainer}>
            <IonLabel>
              <strong>{`${user.firstName} ${user.lastName}`}</strong>
            </IonLabel>
            <IonLabel>
              <strong>
                {user.community ? user.community.name : user.email}
              </strong>
            </IonLabel>
            {!user.community && (
              <IonRow>
                <IonLabel>
                  We aren't at your university just yet - but we'll be there
                  soon!
                </IonLabel>
              </IonRow>
            )}
          </div>
        </div>
      </IonCol>
    </IonRow>
  );
};
