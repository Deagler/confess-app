import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './FeedPage';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(children: JSX.Element, historyConf = {}) {
  const history = createMemoryHistory(historyConf);
  return render(<Router history={history}>{children}</Router>);
}

test('renders without crashing', () => {
  const { baseElement } = renderWithRouter(
    <Route render={(props) => <FeedPage {...props} />} />
  );
  expect(baseElement).toBeDefined();
});
