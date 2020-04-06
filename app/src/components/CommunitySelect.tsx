import React from 'react';
import {
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonIcon,
  IonThumbnail,
  IonImg,
  IonSpinner,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface CommunitySelectProps {
  onCommunityChange(e: React.ChangeEvent<{}>, val: string): void;
  communityNames?: string[];
  selectedCommunity?: string;
  loading: boolean;
}

const CommunitySelect: React.FC<CommunitySelectProps> = (
  props: CommunitySelectProps
) => {
  const {
    loading,
    communityNames,
    onCommunityChange,
    selectedCommunity,
  } = props;

  const popoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  return (
    <Autocomplete
      id="community-selector"
      options={communityNames || []}
      getOptionLabel={(option) => option}
      defaultValue={selectedCommunity}
      getOptionSelected={(option, value) => option == selectedCommunity}
      onChange={(e, val) => onCommunityChange}
      disableClearable={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a University"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <IonSpinner /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(option) =>
        !loading ? (
          <React.Fragment>
            <IonThumbnail slot="start">
              <IonImg src={'assets/uoa.svg'} />
            </IonThumbnail>
            <IonLabel>{option}</IonLabel>
          </React.Fragment>
        ) : (
          'Loading...'
        )
      }
      loading={loading}
    />
  );
};

export default CommunitySelect;
