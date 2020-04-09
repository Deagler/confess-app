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
import { useShouldBlockMenu } from '../utils/menus';
import { appPageCSS, backgroundColor } from '../theme/global';
import { chatbox, shieldCheckmark } from 'ionicons/icons';
import LoginTooltip from './LoginTooltip';
import { useSelectedCommunity } from '../customHooks/location';
import { buildLink } from '../utils';

const menuCSS = css({
  borderRight: '0',
  '@media(min-width:992px)': {
    maxWidth: '300px',
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
  const shouldBlockMenu = useShouldBlockMenu();
  const communityId = useSelectedCommunity();
  const isAdmin = localUserQuery?.data?.localUser?.isAdmin;

  if (shouldBlockMenu) {
    return null;
  }

  return (
    <React.Fragment>
      <IonMenu {...css(menuCSS, appPageCSS)} contentId="main" type="overlay">
        <IonContent>
          <div className="ion-hide-lg-up">
            <AppLogo />
          </div>

          <div {...sidebarContent} className="ion-padding">
            <LoginTooltip loginOrSignUpTo="confess" userLoggedIn={userLoggedIn}>
              <IonButton
                expand="block"
                routerLink={buildLink('/submit', communityId)}
                routerDirection="forward"
                className="ion-margin-bottom ion-hide-lg-down"
                disabled={!userLoggedIn}
              >
                <IonIcon color="white" slot="start" icon={chatbox} />
                New Confession
              </IonButton>
            </LoginTooltip>
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
            <div {...channelsContainer}>
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
