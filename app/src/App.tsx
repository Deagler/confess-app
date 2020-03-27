import Menu from './components/Menu';
import Page from './pages/Page';
import FeedPage from './pages/FeedPage';
import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
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

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={selectedPage} />
          <IonRouterOutlet id="main">
            <Route path="/page/feed" render={() => <FeedPage />} exact={true} />
            <Route
              path="/page/admin"
              render={() => <AdminPage />}
              exact={true}
            />
            <Route
              path="/page/submit"
              render={() => <SubmitPage />}
              exact={true}
            />
            <Route
              path="/page/:name"
              render={(props) => {
                setSelectedPage(props.match.params.name);
                return <Page {...props} />;
              }}
              exact={true}
            />
            <Route
              path="/"
              render={() => <Redirect to="/page/Inbox" />}
              exact={true}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
