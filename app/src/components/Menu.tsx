import React, { useState } from 'react';
import * as firebase from 'firebase/app';
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
import { LoginInput } from './LoginInput';

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

  return (
    <React.Fragment>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonMenu contentId="main" type="overlay">
        <IonToolbar>
          <IonTitle>Confess</IonTitle>
        </IonToolbar>
        <IonContent>
          <CommunitySelect
            selectedCommunity={selectedCommunity}
            communityNames={data && data.communities.map((e) => e.name)}
            loading={loading}
            onCommunityChange={handleCommunityChange}
          />
          <LoginInput />
          <ChannelList channels={channels} loading={false} />
        </IonContent>
      </IonMenu>
    </React.Fragment>
  );
};

export default withRouter(Menu);
