import React from 'react';
import {
  IonContent,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonToast,
  IonSpinner,
  IonFooter,
  IonHeader,
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
import { AppLogo } from './AppLogo';
import { useShouldBlockMenu } from '../utils/menus';
import { appPageCSS, offWhiteCSS } from '../theme/global';

const menuCSS = css({
  borderRight: '0',
  '@media(min-width:992px)': {
    width: '300px',
  },
  scroll: 'none',
});

const sidebarContent = css({
  height: '80%',
  '& .MuiAutocomplete-root': {
    backgroundColor: 'white',
  },
});

const channelsContainer = css({
  marginTop: '4px',
  '& ion-list, ion-item': offWhiteCSS,
  '& ion-list': {
    padding: '0px !important',
    maxHeight: '100%',
    marginTop: '10px',
  },
  '& ion-item': {
    borderLeft: 'solid 1px rgb(190,190,190)',
    borderRadius: '0px !important',
    '.selected': {
      borderLeft: 'solid 1px var(--ion-color-primary)',
    },
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
  const handleCommunityChange = (event: React.ChangeEvent<{}>, val: string) => {
    const community: string = val;
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

  const shouldBlockMenu = useShouldBlockMenu();
  if (shouldBlockMenu) {
    return null;
  }

  return (
    <React.Fragment>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonMenu {...css(menuCSS, appPageCSS)} contentId="main" type="overlay">
        <IonContent>
          <div className="ion-hide-lg-up">
            <AppLogo />
          </div>

          <div {...sidebarContent} className="ion-padding">
            <CommunitySelect
              selectedCommunity={selectedCommunity}
              communityNames={data && data.communities.map((e) => e.name)}
              loading={loading}
              onCommunityChange={handleCommunityChange}
            />
            <div className="ion-hide-lg-up ion-margin-top ion-margin-bottom ion-text-center">
              {localUserQuery.loading || !localUserQuery.called ? (
                <IonSpinner />
              ) : localUserQuery.data?.localUser ? (
                <LocalUserDetail user={localUserQuery.data?.localUser} />
              ) : (
                <LoginInput />
              )}
            </div>
            <div {...channelsContainer}>
              <ChannelList channels={channels} loading={false} />
            </div>
          </div>
        </IonContent>
        {userLoggedIn && (
          <IonFooter className="ion-hide-lg-up">
            <LogoutButton showText={true} />
          </IonFooter>
        )}
      </IonMenu>
    </React.Fragment>
  );
};

export default Menu;
