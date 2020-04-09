import React, { useState, useEffect } from 'react';
import { IonApp, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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

import Menu from './components/Menu';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import {
  apolloClient,
  refreshApolloAuthentication,
} from './services/api/apolloClient';
import { firebaseApp } from './services/firebase';
import { FullPageLoader } from './components/FullPageLoader';
import { WebHeader } from './components/WebHeader';
import { css } from 'glamor';
import { AppRouter } from './AppRouter';
import { GetLocalUser } from './types/GetLocalUser';
import { GET_LOCAL_USER } from './common/graphql/localState';

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
