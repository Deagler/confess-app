import React from 'react';
import { render } from '@testing-library/react';
import FeedSkeleton from '../FeedSkeleton';

test('renders without crashing', () => {
  const { baseElement } = render(<FeedSkeleton />);
  expect(baseElement).toBeDefined();
});
