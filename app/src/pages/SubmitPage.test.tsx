import React from 'react';
import { render } from '@testing-library/react';
import SubmitPage from './SubmitPage';
import { wrapWithApolloProvider, wrapWithRouter } from '../utils/testing';
import { Route } from 'react-router';

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(
      wrapWithRouter(<Route render={(props) => <SubmitPage {...props} />} />)
    )
  );
  expect(baseElement).toBeDefined();
});
