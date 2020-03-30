import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
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
import CommunitySelect from '../components/CommunitySelect';
import ChannelList from '../components/ChannelList';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface UniversityOption {
  title: string;
  id: string;
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

// TODO: get from api
const universities: UniversityOption[] = [
  {
    title: 'UoA',
    id: '1', // placeholder for now
  },
  {
    title: 'AUT',
    id: '2',
  },
  {
    title: 'Lincoln University',
    id: '3',
  },
  {
    title: 'Massey University',
    id: '4',
  },
  {
    title: 'University of Canterbury',
    id: '5',
  },
  {
    title: 'University of Waikato',
    id: '6',
  },
];

const Menu: React.FC<MenuProps> = ({ selectedPage }) => {
  const { data } = useQuery(GET_SELECTED_COMMUNITY);
  const client = useApolloClient();

  const selectedCommunity: string = data ? data.selectedCommunity : '';

  const handleCommunityChange = (
    event: CustomEvent<SelectChangeEventDetail>
  ) => {
    const community: string = event.detail.value!;
    localStorage.setItem('selectedCommunity', community);
    client.writeData({ data: { selectedCommunity: community } });
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confess</IonTitle>
        </IonToolbar>
        <CommunitySelect
          selectedCommunity={selectedCommunity}
          communityNames={universities.map((e) => e.title)}
          loading={false}
          onCommunityChange={handleCommunityChange}
        />
        <IonButton expand="block">LogIn</IonButton>
        <IonButton expand="block">SignUp</IonButton>
      </IonHeader>

      <IonContent>
        <ChannelList channels={appPages.map((e) => e.title)} loading={false} />
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
