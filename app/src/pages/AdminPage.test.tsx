import React from 'react';
import { render } from '@testing-library/react';
import AdminPage from './AdminPage';

test('renders without crashing', () => {
  const { baseElement } = render(<AdminPage />);
  expect(baseElement).toBeDefined();
});
