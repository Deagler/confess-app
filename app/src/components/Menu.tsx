import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import React from 'react';
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
import UserProfile from './UserProfile';

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
    url: '/page/Feed',
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
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <UserProfile />
        <IonList id="inbox-list" className="ion-no-border">
          {appPages.map((appPage, index) => (
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
