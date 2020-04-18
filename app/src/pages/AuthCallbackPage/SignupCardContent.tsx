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
  const [displayName, setDisplayName] = useState<string>();
  return (
    <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonInput
              style={{ maxWidth: '400px', minWidth: '250px' }}
              placeholder={'Enter a display name.'}
              value={displayName}
              onIonChange={(e) => setDisplayName(e.detail.value!)}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              disabled={!displayName}
              onClick={() => submit(displayName)}
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
