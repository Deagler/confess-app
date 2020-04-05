import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import LandingPage from './pages/LandingPage';
import Menu from './components/Menu';
import FeedPage from './pages/FeedPage';
import SubmitPage from './pages/SubmitPage';
import AdminPage from './pages/AdminPage';
import Postpage from './pages/PostPage';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  apolloClient,
  refreshApolloAuthentication,
} from './services/api/apolloClient';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { firebaseApp } from './services/firebase';
import { FullPageLoader } from './components/FullPageLoader';
import SecureRoute from './components/SecureRoute';
import { WebHeader, appPageCSS } from './components/WebHeader';
import { css } from 'glamor';
import { AppRouter } from './AppRouter';
import { app } from 'firebase';

export const GlobalAppUtils = {
  showLoading: () => {},
  hideLoading: () => {},
  showToast: () => {},
  hideToast: () => {},
};

const auth = firebaseApp.auth();

const appContainer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,
});

const App: React.FC = () => {
  const [authLocalUser, setAuthLocalUser] = useState<
    firebase.User | undefined | null
  >(undefined);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthLocalUser(user!);

      if (user) {
        apolloClient.reFetchObservableQueries();
        refreshApolloAuthentication();
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <IonApp>
      {authLocalUser === undefined ? (
        <FullPageLoader />
      ) : (
        <IonReactRouter>
          <ApolloProvider client={apolloClient}>
            <div {...appContainer}>
              <WebHeader />

              <IonSplitPane contentId="main">
                <Menu />
                <AppRouter userLoggedIn={!!authLocalUser} />
              </IonSplitPane>
            </div>
          </ApolloProvider>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
