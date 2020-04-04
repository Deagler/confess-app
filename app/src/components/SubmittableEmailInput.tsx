import { IonRow, IonCol, IonInput, IonButton, IonSpinner } from '@ionic/react';
import React from 'react';
import { IsValidEmailFormat } from '../utils';
import { css } from 'glamor';

const lightPadding = css({
  padding: '8px',
  wrap: true,
});

export const SubmittableEmailInput: React.FC<{
  email?: string;
  setEmail: any;
  placeholderText: string;
  loading: boolean;
  submit: any;
  submitText: string;
}> = ({ email, setEmail, placeholderText, loading, submit, submitText }) => {
  return (
    <IonRow {...lightPadding}>
      <IonCol size-md="9" size-sm="12">
        <IonInput
          value={email}
          style={{ width: '100%' }}
          placeholder={placeholderText}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonCol>
      <IonCol
        size-sm="12"
        size-md="3"
        className="ion-text-center ion-align-self-end ion-justify-self-end"
      >
        <IonButton
          disabled={!email || !IsValidEmailFormat(email) || loading}
          onClick={() => submit(email)}
        >
          {loading ? <IonSpinner /> : submitText}
        </IonButton>
      </IonCol>
    </IonRow>
  );
};
