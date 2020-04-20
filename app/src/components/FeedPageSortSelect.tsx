import { Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { IonIcon } from '@ionic/react';
import { timeOutline, heartOutline, chatboxOutline } from 'ionicons/icons';
import { css } from 'glamor';

const iconStyles = css({
  marginRight: '12px',
  fontSize: '22px',
});

export interface FeedPageSortSelectProps {
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

const FeedPageSortSelect: React.FC<FeedPageSortSelectProps> = ({
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
      style: { display: 'flex', alignItems: 'center' },
    }}
  >
    <MenuItem value="postNumber">
      <IonIcon slot="start" icon={timeOutline} {...iconStyles} />
      Newest
    </MenuItem>
    <MenuItem value="totalLikes">
      <IonIcon slot="start" icon={heartOutline} {...iconStyles} />
      Most likes
    </MenuItem>
    <MenuItem value="totalComments">
      <IonIcon slot="start" icon={chatboxOutline} {...iconStyles} />
      Most comments
    </MenuItem>
  </Select>
);

export default FeedPageSortSelect;
