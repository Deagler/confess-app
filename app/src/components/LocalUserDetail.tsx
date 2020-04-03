import { IonRow, IonCol, IonLabel, IonAvatar } from '@ionic/react';
import React from 'react';
import { GetLocalUser_localUser } from '../types/GetLocalUser';

export const LocalUserDetail: React.FC<{
  user: GetLocalUser_localUser;
}> = ({ user }) => {
  return (
    <IonRow>
      <IonCol size="1.5" className="ion-padding">
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
      </IonCol>
      <IonCol
        size="9"
        className="ion-align-items-center ion-align-content-center ion-padding"
      >
        <IonRow>
          <IonLabel>
            <strong>{`${user.firstName} ${user.lastName}`}</strong>
          </IonLabel>
        </IonRow>
        <IonRow>
          <IonLabel>
            <strong>{user.community ? user.community.name : user.email}</strong>
          </IonLabel>
        </IonRow>
        {!user.community && (
          <IonRow>
            <IonLabel>
              We aren't at your university just yet - but we'll be there soon!
            </IonLabel>
          </IonRow>
        )}
      </IonCol>
    </IonRow>
  );
};
