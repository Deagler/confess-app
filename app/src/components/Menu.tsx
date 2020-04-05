import React from 'react';
import {
  IonContent,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonFooter,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import {
  GET_SELECTED_COMMUNITY,
  GET_LOCAL_USER,
} from '../common/graphql/localState';

import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

import './Menu.css';
import { LoginInput } from './LoginInput';
import { LocalUserDetail } from './LocalUserDetail';
import { GetLocalUser } from '../types/GetLocalUser';
import { LogoutButton } from './LogoutButton';

const Menu: React.FC<{}> = () => {
  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;

  // restore selected community from local storage
  const selectedCommunityQuery = useQuery(GET_SELECTED_COMMUNITY);
  const selectedCommunity: string =
    selectedCommunityQuery.data?.selectedCommunity || '';

  const channels: string[] = [];
  // TODO: get channels from selected community

  // cant put this in App because you cant have useLocation
  // in the same component as the router is defined
  const location = useLocation();
  if (location.pathname === '/landing') {
    return null;
  }

  console.log(localUserQuery);

  return (
    <React.Fragment>
      <IonMenu contentId="main" type="overlay">
        <IonToolbar>
          <IonTitle>Confess</IonTitle>
        </IonToolbar>
        <IonContent>
          <CommunitySelect />

          {localUserQuery.loading || !localUserQuery.called ? (
            <IonSpinner />
          ) : localUserQuery.data?.localUser ? (
            <LocalUserDetail user={localUserQuery.data?.localUser} />
          ) : (
            <LoginInput />
          )}
          <ChannelList channels={channels} loading={false} />
        </IonContent>
        {userLoggedIn && (
          <IonFooter>
            <LogoutButton />
          </IonFooter>
        )}
      </IonMenu>
    </React.Fragment>
  );
};

export default Menu;
