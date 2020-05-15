import SubmissionRulesModal, {
  SubmissionRulesModalProps,
} from '../SubmissionRulesModal';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

test('renders information only modal', () => {
  const props: SubmissionRulesModalProps = {
    isOpen: true,
    onDidDismiss: () => null,
    onSubmit: () => null,
    loadingSubmit: false,
    infoOnly: true,
  };

  const { queryByText } = render(
    <MockedProvider>
      <MemoryRouter>
        <SubmissionRulesModal {...props} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(queryByText('Submission Rules')).toBeInTheDocument();
  expect(queryByText('Close')).toBeInTheDocument();
  expect(queryByText('Submit Confession')).toBeNull();
});

test('renders submission modal and submits', async () => {
  let submitCalled = false;
  const handleSubmit = () => {
    submitCalled = true;
  };
  const props: SubmissionRulesModalProps = {
    isOpen: true,
    onDidDismiss: () => null,
    onSubmit: handleSubmit,
    loadingSubmit: false,
    infoOnly: false,
  };

  const { findByText } = render(
    <MockedProvider>
      <MemoryRouter>
        <SubmissionRulesModal {...props} />
      </MemoryRouter>
    </MockedProvider>
  );

  const button = await findByText('Submit Confession', {
    selector: '[type="submit"]',
  });
  fireEvent.click(button);

  expect(submitCalled).toBeTruthy();
});
