import React, { useState } from 'react';
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
  IonSelect,
  IonSelectOption,
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
  const [university, setUniversity] = useState<string>();

  const customPopoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confess</IonTitle>
        </IonToolbar>
        <IonSelect
          interfaceOptions={customPopoverOptions}
          interface="popover"
          placeholder="Select University"
          onIonChange={(e) => setUniversity(e.detail.value)}
          value={university}
        >
          {universities.map((uni: UniversityOption, index: number) => (
            <IonSelectOption key={index}>
              <IonLabel className="ion-text-wrap">{uni.title}</IonLabel>
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonButton expand="block">LogIn</IonButton>
        <IonButton expand="block">SignUp</IonButton>
      </IonHeader>

      <IonContent>
        <IonList id="inbox-list" className="ion-no-border">
          {appPages.map((appPage: AppPage, index: number) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={selectedPage === appPage.title ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={appPage.iosIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
