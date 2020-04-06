import React from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { css } from 'glamor';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_AUTH_STATE, GET_LOCAL_USER } from '../common/graphql/localState';

const logoutButton = css({
  color: 'red',
});

const LOGOUT_MUTATION = gql`
  mutation Logout {
    doFirebaseLogout @client {
      code
      success
      message
      authState {
        accessToken
      }
    }
  }
`;

export const LogoutButton: React.FC<{ showText: boolean }> = ({ showText }) => {
  const [doLogout, { loading }] = useMutation(LOGOUT_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_AUTH_STATE }, { query: GET_LOCAL_USER }],
    onCompleted: () => {
      window.location.href = '/';
    },
  });

  const handleLogout = async () => {
    await doLogout();
  };

  return (
    <div>
      <IonButton
        disabled={loading}
        fill="clear"
        {...logoutButton}
        onClick={handleLogout}
      >
        {loading ? (
          <IonSpinner />
        ) : (
          <IonIcon icon={logOutOutline} slot="start" />
        )}
        {showText && <span>Logout</span>}
      </IonButton>
    </div>
  );
};
