import React from 'react';
import {
  IonContent,
  IonMenu,
  IonSpinner,
  IonFooter,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';

import { GET_LOCAL_USER } from '../common/graphql/localState';

import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

import './Menu.css';
import { LoginInput } from './LoginInput';
import { LocalUserDetail } from './LocalUserDetail';
import { GetLocalUser } from '../types/GetLocalUser';
import { LogoutButton } from './LogoutButton';
import { css } from 'glamor';
import { AppLogo } from './AppLogo';
import {
  useShouldBlockMenu,
  useShouldBlockConfess,
} from '../customHooks/menus';
import { appPage, backgroundColor } from '../styles/global';
import { chatbox, shieldCheckmark } from 'ionicons/icons';
import ButtonDisabledTooltip from './ButtonDisabledTooltip';
import { useSelectedCommunity } from '../customHooks/location';
import { buildLink } from '../utils';
import { useSelectedChannel } from '../customHooks/location';

const menu = css({
  borderRight: '0',
  '@media(min-width:992px)': {
    maxWidth: '300px',
  },
  scroll: 'none',
});

const sidebarContent = css({
  height: '80%',
  '& .MuiAutocomplete-root': {
    backgroundColor: 'var(--ion-background-color)',
  },
});

const channelsContainer = css({
  marginTop: '4px',
  '& ion-list, ion-item': backgroundColor,
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
  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;
  const userHasCommunity = !!localUserQuery.data?.localUser?.community;
  const shouldBlockMenu = useShouldBlockMenu();
  const shouldBlockConfess = useShouldBlockConfess();
  const communityId = useSelectedCommunity();
  const isAdmin = localUserQuery?.data?.localUser?.isAdmin;
  const userFromSelectedComm: boolean =
    communityId === localUserQuery.data?.localUser?.community?.id;
  const channelId = useSelectedChannel();
  return (
    <React.Fragment>
      <IonMenu
        {...css(menu, appPage)}
        contentId="main"
        type="overlay"
        disabled={shouldBlockMenu}
      >
        <IonContent>
          <div className="ion-hide-lg-up">
            <AppLogo />
          </div>

          <div {...sidebarContent} className="ion-margin-bottom ion-padding">
            {!shouldBlockConfess && (
              <ButtonDisabledTooltip
                action="confess"
                userLoggedIn={userLoggedIn}
                userHasCommunity={userHasCommunity}
                userNotFromSelectedComm={!userFromSelectedComm}
              >
                <IonButton
                  expand="block"
                  routerLink={buildLink('/submit', communityId, channelId)}
                  routerDirection="forward"
                  className="ion-margin-bottom ion-hide-lg-down"
                  disabled={
                    !userLoggedIn || !userHasCommunity || !userFromSelectedComm
                  }
                >
                  <IonIcon color="white" slot="start" icon={chatbox} />
                  New Confession
                </IonButton>
              </ButtonDisabledTooltip>
            )}
            <div className=" ion-padding-top ion-padding-bottom">
              <CommunitySelect />
            </div>

            <div className="ion-hide-lg-up ion-margin-top ion-margin-bottom ion-text-center">
              {localUserQuery.loading || !localUserQuery.called ? (
                <IonSpinner />
              ) : localUserQuery.data?.localUser ? (
                <LocalUserDetail user={localUserQuery.data?.localUser} />
              ) : (
                <LoginInput />
              )}
            </div>
            <div
              className="ion-margin-bottom ion-padding-bottom"
              {...channelsContainer}
            >
              <ChannelList />
            </div>
            {isAdmin && (
              <IonButton
                expand="block"
                routerLink={buildLink('/admin', communityId)}
                className="ion-margin-top"
              >
                <IonIcon icon={shieldCheckmark} />
                Admin Portal
              </IonButton>
            )}
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
