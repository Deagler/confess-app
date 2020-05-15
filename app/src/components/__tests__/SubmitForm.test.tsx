import SubmitForm, { SubmitFormProps } from '../SubmitForm';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import React from 'react';

const props: SubmitFormProps = {
  setSelectedChannel: () => null,
  setTitle: () => null,
  setImage: () => null,
  setConfessionText: () => null,
  setAuthorAlias: () => null,
  onDisplayRules: () => null,
  setImageURL: () => null,
};

test('renders without crashing', () => {
  const { baseElement } = render(
    <MockedProvider>
      <MemoryRouter>
        <SubmitForm {...props} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});
