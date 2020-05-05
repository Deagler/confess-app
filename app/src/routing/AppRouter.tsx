import { Switch, Route, Redirect } from 'react-router';
import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import AuthCallbackPage from '../pages/Auth/AuthCallbackPage';
import LandingPage from '../pages/LandingPage';
import FeedPage from '../pages/FeedPage';
import SecureRoute from '../components/SecureRoute';
import AdminPage from '../pages/AdminPage';
import SubmitPage from '../pages/SubmitPage';
import Postpage from '../pages/PostPage';
import SignUpPage from '../pages/Auth/SignupPage';

export const AppRouter: React.FC<{
  userLoggedIn: boolean;
  redirectToSignup: boolean;
}> = ({ userLoggedIn, redirectToSignup }) => {
  return userLoggedIn && redirectToSignup ? (
    <Switch>
      <IonRouterOutlet id="main">
        <Route
          path="/signup"
          render={(props) => <SignUpPage {...props} />}
          exact={true}
        />
        <Route path="/" render={(props) => <Redirect to={`/signup`} />} />
      </IonRouterOutlet>
    </Switch>
  ) : (
    <Switch>
      <IonRouterOutlet id="main">
        <Route
          path="/"
          render={() => {
            const defaultCommunity =
              localStorage.getItem('selectedCommunityId') ||
              'O0jkcLwMRy77krkmAT2q';
            return userLoggedIn ? (
              <Redirect to={`/${defaultCommunity}/posts`} />
            ) : (
              <LandingPage />
            );
          }}
          exact={true}
        />
        <Route
          path="/callback"
          render={(props) => <AuthCallbackPage {...props} />}
          exact={true}
        />
        <Route
          path="/signup"
          render={(props) => <SignUpPage {...props} />}
          exact={true}
        />
        <Route
          path="/:communityId/posts"
          render={(props) => <FeedPage {...props} />}
          exact={true}
        />
        <SecureRoute
          path="/:communityId/admin"
          component={AdminPage}
          exact={true}
        />
        <Route
          path="/:communityId/submit"
          render={(props) =>
            !userLoggedIn ? <Redirect to="/" /> : <SubmitPage {...props} />
          }
          exact={true}
        />
        <Route
          path="/:communityId/posts/:id"
          render={() => <Postpage />}
          exact={true}
        />
      </IonRouterOutlet>
    </Switch>
  );
};
