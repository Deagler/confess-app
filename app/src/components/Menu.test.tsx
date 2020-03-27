import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';

test('renders without crashing', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <Menu selectedPage="feed" />
    </MemoryRouter>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Menu selectedPage="feed" />
    </MemoryRouter>
  );
  await findByText('Confess');
  await findByText('LogIn');
  await findByText('SignUp');
});
