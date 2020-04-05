import { IonRow, IonCol, IonInput, IonButton, IonSpinner } from '@ionic/react';
import React from 'react';
import { IsValidEmailFormat } from '../utils';
import { css } from 'glamor';

const lightPadding = css({
  padding: '8px',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '400px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
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
    <div {...lightPadding}>
      <div>
        <IonInput
          value={email}
          style={{ maxWidth: '400px', minWidth: '300px' }}
          placeholder={placeholderText}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </div>

      <div>
        <IonButton
          disabled={!email || !IsValidEmailFormat(email) || loading}
          onClick={() => submit(email)}
          fill="solid"
        >
          {loading ? <IonSpinner /> : submitText}
        </IonButton>
      </div>
    </div>
  );
};
