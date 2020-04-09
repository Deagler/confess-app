import React, { ReactNode } from 'react';
import { Tooltip } from '@material-ui/core';

export interface LoginTooltipProps {
  loginOrSignUpTo: string;
  userLoggedIn: boolean;
  userHasCommunity: boolean;
  children: ReactNode;
  inline?: boolean;
}

const LoginTooltip: React.FC<LoginTooltipProps> = ({
  loginOrSignUpTo,
  userLoggedIn,
  userHasCommunity,
  children,
  inline,
}) => {
  const tooltipText = !userHasCommunity
    ? `Sorry you can't ${loginOrSignUpTo} yet. We'll be at your university soon though!`
    : `Log in or sign up to ${loginOrSignUpTo}`;
  return (
    <Tooltip
      arrow={true}
      disableFocusListener={userLoggedIn && userHasCommunity}
      disableHoverListener={userLoggedIn && userHasCommunity}
      disableTouchListener={userLoggedIn && userHasCommunity}
      enterTouchDelay={200}
      title={tooltipText}
      aria-label={`${loginOrSignUpTo}-disabled`}
    >
      {inline ? <span>{children}</span> : <div>{children}</div>}
    </Tooltip>
  );
};

export default LoginTooltip;
