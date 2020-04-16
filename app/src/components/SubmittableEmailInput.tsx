import { IonButton, IonSpinner } from '@ionic/react';
import React from 'react';
import { IsValidEmailFormat } from '../utils';
import { css } from 'glamor';
import { TextField } from '@material-ui/core';

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
  const submitButtonDisabled = !email || !IsValidEmailFormat(email) || loading;

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
          <TextField
            variant="outlined"
            label={placeholderText}
            value={email}
            type="email"
            style={{ maxWidth: '400px', minWidth: '270px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <IonButton disabled={submitButtonDisabled} fill="solid" type="submit">
            {loading ? <IonSpinner /> : submitText}
          </IonButton>
        </div>
      </div>
    </form>
  );
};
