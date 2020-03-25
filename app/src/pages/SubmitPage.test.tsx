import React from 'react';
import { render } from '@testing-library/react';
import SubmitPage from './SubmitPage';

test('renders without crashing', () => {
  const { baseElement } = render(<SubmitPage />);
  expect(baseElement).toBeDefined();
});
