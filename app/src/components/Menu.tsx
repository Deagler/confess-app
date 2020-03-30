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
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  globeOutline,
  globeSharp,
  hammerOutline,
  hammerSharp,
  cardOutline,
  cardSharp,
  colorPaletteOutline,
  colorPaletteSharp,
} from 'ionicons/icons';
import './Menu.css';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { SelectChangeEventDetail } from '@ionic/core';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Feed',
    url: '/page/posts',
    iosIcon: globeOutline,
    mdIcon: globeSharp,
  },
  {
    title: 'Engineering',
    url: '/page/Engineering',
    iosIcon: hammerOutline,
    mdIcon: hammerSharp,
  },
  {
    title: 'Commerce',
    url: '/page/Commerce',
    iosIcon: cardOutline,
    mdIcon: cardSharp,
  },
  {
    title: 'Arts',
    url: '/page/Arts',
    iosIcon: colorPaletteOutline,
    mdIcon: colorPaletteSharp,
  },
];

const Menu: React.FC<MenuProps> = ({ selectedPage }) => {
  // get communities and channels
  const { loading, data, error } = useQuery(GET_COMMUNITIES);

  // restore selected community from local storage
  const selectedCommunityQuery = useQuery(GET_SELECTED_COMMUNITY);
  const selectedCommunity: string =
    selectedCommunityQuery.data?.selectedCommunity || '';

  const client = useApolloClient();
  const handleCommunityChange = (
    event: CustomEvent<SelectChangeEventDetail>
  ) => {
    const community: string = event.detail.value!;
    localStorage.setItem('selectedCommunity', community);
    client.writeData({ data: { selectedCommunity: community } });
  };

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
          <ChannelList
            channels={appPages.map((e) => e.title)}
            loading={false}
          />
        </IonContent>
      </IonMenu>
    </>
  );
};

export default withRouter(Menu);
