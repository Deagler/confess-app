import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './FeedPage';

test('renders without crashing', () => {
  const { baseElement } = render(<FeedPage />);
  expect(baseElement).toBeDefined();
});
