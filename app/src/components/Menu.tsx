import React from 'react';
import {
  IonContent,
  IonMenu,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonToast,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { useLocation } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import { GET_COMMUNITIES } from '../common/graphql/communities';

import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

import './Menu.css';

const Menu: React.FC<{}> = () => {
  // get communities and channels
  const { loading, data, error } = useQuery(GET_COMMUNITIES);

  // restore selected community from local storage
  const selectedCommunityQuery = useQuery(GET_SELECTED_COMMUNITY);
  const selectedCommunity: string =
    selectedCommunityQuery.data?.selectedCommunity || '';

  let channels: string[] = [];
  if (data && selectedCommunity) {
    // TODO: streamline this, possibly set community object/id instead of name
    channels = data.communities
      .find((e) => e.name === selectedCommunity)
      .channels.map((e) => e.name);
  }

  const client = useApolloClient();
  const handleCommunityChange = (
    event: CustomEvent<SelectChangeEventDetail>
  ) => {
    const community: string = event.detail.value!;
    localStorage.setItem('selectedCommunity', community);
    client.writeData({ data: { selectedCommunity: community } });
  };

  // cant put this in App because you cant have useLocation
  // in the same component as the router is defined
  const location = useLocation();
  if (location.pathname === '/landing') {
    return null;
  }

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonMenu contentId="main" type="overlay">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confess</IonTitle>
          </IonToolbar>
          <CommunitySelect
            selectedCommunity={selectedCommunity}
            communityNames={data && data.communities.map((e) => e.name)}
            loading={loading}
            onCommunityChange={handleCommunityChange}
          />
          <IonButton expand="block">LogIn</IonButton>
          <IonButton expand="block">SignUp</IonButton>
        </IonHeader>

        <IonContent>
          <ChannelList channels={channels} loading={false} />
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
