import React from 'react';
import { render } from '@testing-library/react';
import { FullPageLoader } from '../FullPageLoader';

test('renders without crashing', () => {
  const { baseElement } = render(<FullPageLoader />);
  expect(baseElement).toBeDefined();
});
