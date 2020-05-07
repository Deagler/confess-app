import React from 'react';
import { render } from '@testing-library/react';
import LandingPost, { PostProps } from '../LandingPost';
import { MemoryRouter } from 'react-router-dom';
import { wrapWithApolloProvider } from '../../utils/testing';

const props: PostProps = {
  id: 'id',
  postNumber: 1,
  title: 'this is the title',
  creationTimestamp: Math.round(new Date().getTime() / 1000), // unix timestamp
  content: 'this is the content',
  authorAlias: 'this is the author',
};

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <LandingPost {...props} />
      </MemoryRouter>
    )
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <LandingPost {...props} />
      </MemoryRouter>
    )
  );
  await findByText('#1');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('~ this is the author');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <LandingPost {...props} authorAlias={undefined} />
      </MemoryRouter>
    )
  );
  await findByText('~ Anonymous');
});
