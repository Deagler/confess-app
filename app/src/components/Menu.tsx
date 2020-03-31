import React, { useState } from 'react';
import {
  IonContent,
  IonMenu,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonRow,
  IonToast,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import { GET_COMMUNITIES } from '../common/graphql/communities';

import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

import './Menu.css';

const Menu: React.FC<{}> = () => {
  // get communities and channels
  const { loading, data, error } = useQuery(GET_COMMUNITIES);
  const [loginEmail, setLoginEmail] = useState<string>();

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

  const handleLogin = () => {};

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
          <IonRow>
            <IonInput
              value={loginEmail}
              placeholder="Enter your university e-mail"
              onIonChange={(e) => setLoginEmail(e.detail.value!)}
            />
            <IonButton onClick={handleLogin}>Login</IonButton>
          </IonRow>
        </IonHeader>

        <IonContent>
          <ChannelList channels={channels} loading={false} />
        </IonContent>
      </IonMenu>
    </>
  );
};

export default withRouter(Menu);
