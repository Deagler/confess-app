import Menu from './components/Menu';
import FeedPage from './pages/FeedPage';
import React, { useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

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
import SubmitPage from './pages/SubmitPage';
import AdminPage from './pages/AdminPage';
import Postpage from './pages/PostPage';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from './services/api/apolloClient';

export const GlobalAppUtils = {
  showLoading: (msg?) => {},
  hideLoading: () => {},
  showToast: (msg, duration?) => {},
  hideToast: () => {},
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: '',
    duration: 2000,
  });

  GlobalAppUtils.showLoading = (msg = 'Please Wait...') => {
    setLoading(true);
    setLoadingMsg(msg);
  };

  GlobalAppUtils.hideLoading = () => {
    setLoading(false);
    setLoadingMsg('');
  };

  GlobalAppUtils.showToast = (msg, duration = 2000) => {
    setToastInfo({ show: true, message: msg, duration });
  };

  GlobalAppUtils.hideToast = () => {
    setToastInfo({ show: false, message: '', duration: 2000 });
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => GlobalAppUtils.hideLoading()}
            message={loadingMsg}
          />
          <IonToast
            isOpen={toastInfo.show}
            onDidDismiss={() => GlobalAppUtils.hideToast()}
            message={toastInfo.message}
            duration={toastInfo.duration}
          />
          <ApolloProvider client={apolloClient}>
            <Menu />
            <IonRouterOutlet id="main">
              <Route
                path="/page/posts"
                render={(props) => <FeedPage {...props} />}
                exact={true}
              />
              <Route
                path="/page/admin"
                render={() => <AdminPage />}
                exact={true}
              />
              <Route
                path="/page/submit"
                render={(props) => <SubmitPage {...props} />}
                exact={true}
              />
              <Route
                path="/"
                render={() => <Redirect to="/page/Inbox" />}
                exact={true}
              />
              <Route
                path="/page/posts/:id"
                render={() => <Postpage />}
                exact={true}
              />
            </IonRouterOutlet>
          </ApolloProvider>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
