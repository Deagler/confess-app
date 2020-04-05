import React from 'react';
import {
  IonContent,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonToast,
  IonSpinner,
  IonFooter,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { useLocation } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import {
  GET_SELECTED_COMMUNITY,
  GET_LOCAL_USER,
} from '../common/graphql/localState';
import { GET_COMMUNITIES } from '../common/graphql/communities';

import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

import './Menu.css';
import { LoginInput } from './LoginInput';
import { gql } from 'apollo-boost';
import { LocalUserDetail } from './LocalUserDetail';
import { GetLocalUser } from '../types/GetLocalUser';
import { LogoutButton } from './LogoutButton';
import { css } from 'glamor';
import { appPageCSS } from './WebHeader';
import { AppLogo } from './AppLogo';

const menuCss = css({
  borderRight: '0',
  '@media(min-width:992px)': {
    width: '300px',
  },
});

const Menu: React.FC<{}> = () => {
  // get communities and channels
  const { loading, data, error } = useQuery(GET_COMMUNITIES);
  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;

  // restore selected community from local storage
  const selectedCommunityQuery = useQuery(GET_SELECTED_COMMUNITY);
  const selectedCommunity: string =
    selectedCommunityQuery.data?.selectedCommunity || '';

  let channels: string[] = [];
  if (data && selectedCommunity && data.communities) {
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
    client.writeQuery({
      query: gql`
        query getSelectedCommunity {
          selectedCommunity
        }
      `,
      data: { selectedCommunity: community },
    });
  };

  // cant put this in App because you cant have useLocation
  // in the same component as the router is defined
  const location = useLocation();
  if (location.pathname === '/landing') {
    return null;
  }

  console.log(localUserQuery);

  return (
    <React.Fragment>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonMenu {...css(menuCss, appPageCSS)} contentId="main" type="overlay">
        <IonToolbar className="ion-hide-lg-up">
          <AppLogo />
        </IonToolbar>
        <IonContent>
          <CommunitySelect
            selectedCommunity={selectedCommunity}
            communityNames={data && data.communities.map((e) => e.name)}
            loading={loading}
            onCommunityChange={handleCommunityChange}
          />
          <div className="ion-hide-lg-up">
            {localUserQuery.loading || !localUserQuery.called ? (
              <IonSpinner />
            ) : localUserQuery.data?.localUser ? (
              <LocalUserDetail user={localUserQuery.data?.localUser} />
            ) : (
              <LoginInput />
            )}
          </div>

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
