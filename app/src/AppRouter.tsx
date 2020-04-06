import { Switch, Route, Redirect } from 'react-router';
import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import AuthCallbackPage from './pages/AuthCallbackPage/AuthCallbackPage';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import SecureRoute from './components/SecureRoute';
import AdminPage from './pages/AdminPage';
import SubmitPage from './pages/SubmitPage';
import Postpage from './pages/PostPage';

export const AppRouter: React.FC<{ userLoggedIn: boolean }> = (
  userLoggedIn
) => {
  return (
    <Switch>
      <IonRouterOutlet id="main">
        <Route
          path="/"
          render={() =>
            userLoggedIn ? (
              <Redirect to="/page/posts" />
            ) : (
              <Redirect to="/landing" />
            )
          }
          exact={true}
        />
        <Route
          path="/callback"
          render={(props) => <AuthCallbackPage {...props} />}
          exact={true}
        />
        <Route path="/landing" render={() => <LandingPage />} exact={true} />
        <Route
          path="/page/posts"
          render={(props) => <FeedPage {...props} />}
          exact={true}
        />
        <SecureRoute path="/page/admin" component={AdminPage} exact={true} />
        <Route
          path="/page/submit"
          render={(props) => <SubmitPage {...props} />}
          exact={true}
        />
        <Route
          path="/page/posts/:id"
          render={() => <Postpage />}
          exact={true}
        />
      </IonRouterOutlet>
    </Switch>
  );
};
