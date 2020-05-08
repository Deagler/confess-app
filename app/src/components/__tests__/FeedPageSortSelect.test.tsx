import React from 'react';
import { render } from '@testing-library/react';
import FeedPageSortSelect, {
  FeedPageSortSelectProps,
} from '../FeedPageSortSelect';

const props: FeedPageSortSelectProps = {
  sortProperty: 'totalLikes',
  onSortPropertyChange: () => {},
};

test('renders without crashing', () => {
  const { baseElement } = render(<FeedPageSortSelect {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByDisplayValue } = render(<FeedPageSortSelect {...props} />);
  await findByDisplayValue('totalLikes');
});
