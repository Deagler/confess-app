import React, { ReactNode } from 'react';
import { Tooltip } from '@material-ui/core';

export interface LoginTooltipProps {
  loginOrSignUpTo: string;
  userLoggedIn: boolean;
  children: ReactNode;
  inline?: boolean;
}

const LoginTooltip: React.FC<LoginTooltipProps> = ({
  loginOrSignUpTo,
  userLoggedIn,
  children,
  inline,
}) => (
  <Tooltip
    arrow={true}
    disableFocusListener={userLoggedIn}
    disableHoverListener={userLoggedIn}
    disableTouchListener={userLoggedIn}
    enterTouchDelay={200}
    title={`Log in or sign up to ${loginOrSignUpTo}`}
    aria-label={`Log in or sign up to ${loginOrSignUpTo}`}
  >
    {inline ? <span>{children}</span> : <div>{children}</div>}
  </Tooltip>
);

export default LoginTooltip;
