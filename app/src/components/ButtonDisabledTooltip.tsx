import React, { ReactNode } from 'react';
import { Tooltip } from '@material-ui/core';

export interface ButtonDisabledTooltipProps {
  action: string;
  userLoggedIn: boolean;
  userHasCommunity: boolean;
  userNotFromCommunity?: boolean;
  children: ReactNode;
  inline?: boolean;
}

const ButtonDisabledTooltip: React.FC<ButtonDisabledTooltipProps> = ({
  action,
  userLoggedIn,
  userHasCommunity,
  userNotFromCommunity,
  children,
  inline,
}) => {
  const tooltipText = !userLoggedIn
    ? `Log in or sign up to ${action}`
    : !userHasCommunity
    ? `Sorry you can't ${action} yet. We'll be at your university soon though!`
    : `You can only ${action} in your own community`;

  return (
    <Tooltip
      arrow={true}
      disableFocusListener={
        userLoggedIn && userHasCommunity && !userNotFromCommunity
      }
      disableHoverListener={
        userLoggedIn && userHasCommunity && !userNotFromCommunity
      }
      disableTouchListener={
        userLoggedIn && userHasCommunity && !userNotFromCommunity
      }
      enterTouchDelay={200}
      title={tooltipText}
      aria-label={`${action}-disabled`}
    >
      {inline ? <span>{children}</span> : <div>{children}</div>}
    </Tooltip>
  );
};

export default ButtonDisabledTooltip;
