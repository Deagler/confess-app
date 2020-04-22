import { Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { IonIcon } from '@ionic/react';
import { timeOutline, heartOutline } from 'ionicons/icons';
import { css } from 'glamor';

const iconStyles = css({
  marginRight: '12px',
  fontSize: '22px',
});

export interface CommentSortSelectProps {
  sortProperty: string;
  onSortPropertyChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  className?: string;
}

const CommentSortSelect: React.FC<CommentSortSelectProps> = ({
  sortProperty,
  onSortPropertyChange,
  className,
}) => (
  <Select
    value={sortProperty}
    className={className}
    onChange={onSortPropertyChange}
    disableUnderline={true}
    SelectDisplayProps={{
      style: { display: 'flex', alignItems: 'center', paddingLeft: '12px' },
    }}
  >
    <MenuItem value="totalLikes">
      <IonIcon slot="start" icon={heartOutline} {...iconStyles} />
      Top
    </MenuItem>
    <MenuItem value="creationTimestamp">
      <IonIcon slot="start" icon={timeOutline} {...iconStyles} />
      New
    </MenuItem>
  </Select>
);

export default CommentSortSelect;
