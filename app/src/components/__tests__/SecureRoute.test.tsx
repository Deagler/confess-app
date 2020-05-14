import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import SecureRoute from '../SecureRoute';
import React from 'react';

test('renders without crashing', () => {
  const { container } = render(
    <MockedProvider>
      <MemoryRouter>
        <SecureRoute path="" component={<div>secure</div>} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(container).toBeDefined();
});
