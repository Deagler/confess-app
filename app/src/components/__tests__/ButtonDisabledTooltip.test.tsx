import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonDisabledTooltip, {
  ButtonDisabledTooltipProps,
} from '../ButtonDisabledTooltip';

const props: ButtonDisabledTooltipProps = {
  action: 'like a post',
  children: <button>Button</button>,
  userLoggedIn: false,
  userHasCommunity: true,
};

test('renders without crashing', () => {
  const { baseElement } = render(<ButtonDisabledTooltip {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays children properly', async () => {
  const { findByText } = render(<ButtonDisabledTooltip {...props} />);
  await findByText('Button');
});
