import { IonRow, IonCol, IonInput, IonButton, IonSpinner } from '@ionic/react';
import React from 'react';
import { IsValidEmailFormat } from '../utils';
import { css } from 'glamor';

const lightPadding = css({
  padding: '4px',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '400px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const inputBoxStyling = css({
  '& ion-input': {
    border: 'solid 1px rgba(196, 196, 196, 1)',
    borderRadius: '4px',
  },
  '& ion-input:focus-within': {
    border: 'solid 1px #4f8ef7',
  },
  margin: '0px 4px',
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const isValid = email && IsValidEmailFormat(email) && !loading;
        if (!isValid) {
          return;
        }
        submit(email);
      }}
    >
      <div {...lightPadding}>
        <div {...inputBoxStyling}>
          <IonInput
            value={email}
            inputmode="email"
            type="email"
            style={{ maxWidth: '400px', minWidth: '250px' }}
            placeholder={placeholderText}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </div>

        <div>
          <IonButton
            disabled={!email || !IsValidEmailFormat(email) || loading}
            fill="solid"
            type="submit"
          >
            {loading ? <IonSpinner /> : submitText}
          </IonButton>
        </div>
      </div>
    </form>
  );
};
