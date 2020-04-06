import {
  IonCardContent,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import React, { useState } from 'react';

export const SignupCardContent: React.FC<any> = ({ mutationInfo, submit }) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  return (
    <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonInput
              style={{ maxWidth: '400px', minWidth: '250px' }}
              placeholder={'Enter your first name.'}
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              style={{ maxWidth: '400px', minWidth: '250px' }}
              placeholder={'Enter your last name.'}
              onIonChange={(e) => setLastName(e.detail.value!)}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              disabled={!firstName && !lastName}
              onClick={() => submit(firstName, lastName)}
              fill="solid"
            >
              {mutationInfo.loading ? <IonSpinner /> : 'Signup'}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  );
};
