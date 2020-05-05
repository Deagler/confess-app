import React from 'react';
import { render } from '@testing-library/react';
import CommentSortSelect, {
  CommentSortSelectProps,
} from '../CommentSortSelect';
import { wrapWithApolloProvider, wrapWithRouter } from '../../utils/testing';

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

const props: CommentSortSelectProps = {
  sortProperty: 'top',
  onSortPropertyChange: () => {},
};

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(wrapWithRouter(<CommentSortSelect {...props} />))
  );
  expect(baseElement).toBeDefined();
});
