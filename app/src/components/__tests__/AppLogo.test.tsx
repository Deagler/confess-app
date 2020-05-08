import React from 'react';
import { render } from '@testing-library/react';
import { AppLogo } from '../AppLogo';

test('renders without crashing', () => {
  const { baseElement } = render(<AppLogo />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(<AppLogo />);
  await findByText('Confess');
});
