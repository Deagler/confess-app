import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';
import { Route } from 'react-router';
import { wrapWithApolloProvider, wrapWithRouter } from '../utils/testing';

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(
      wrapWithRouter(<Route render={(props) => <LandingPage />} />)
    )
  );
  expect(baseElement).toBeDefined();
});
