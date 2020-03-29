import React from 'react';
import { render } from '@testing-library/react';
import PostPage from './PostPage';
import { MemoryRouter } from 'react-router-dom';

test('renders without crashing', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <PostPage />
    </MemoryRouter>
  );
  expect(baseElement).toBeDefined();
});
