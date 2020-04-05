import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import React from 'react';
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

export const LogoutButton: React.FC<{}> = () => {
  const [doLogout, { loading }] = useMutation(LOGOUT_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_AUTH_STATE }, { query: GET_LOCAL_USER }],
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
        Logout
      </IonButton>
    </div>
  );
};
