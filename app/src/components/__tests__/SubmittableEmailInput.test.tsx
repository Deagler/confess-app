import { MemoryRouter } from 'react-router';
import {
  SubmittableEmailInputProps,
  SubmittableEmailInput,
} from '../SubmittableEmailInput';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import React from 'react';

const props: SubmittableEmailInputProps = {
  setEmail: () => null,
  placeholderText: 'placeholder',
  loading: false,
  submit: (input: string) => null,
  submitText: 'text',
};

test('renders without crashing', () => {
  const { container } = render(
    <MockedProvider>
      <MemoryRouter>
        <SubmittableEmailInput {...props} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(container).toBeDefined();
});

test('renders loading element', () => {
  const { getByTestId } = render(
    <MockedProvider>
      <MemoryRouter>
        <SubmittableEmailInput {...props} loading={true} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(getByTestId('email-submit-spinner')).toBeInTheDocument();
});
