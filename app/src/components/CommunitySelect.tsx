import React from 'react';
import {
  IonToast,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GetCommunities } from '../types/GetCommunities';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const CommunitySelect: React.FC<{}> = () => {
  const { loading, data, error } = useQuery<GetCommunities>(GET_COMMUNITIES);

  const popoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  const client = useApolloClient();

  const handleCommunityChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const communityId = e.detail.value;

    const selectedCommunity =
      data &&
      data.communities.find((community) => community?.id === communityId);

    // persist selected community across sessions
    localStorage.setItem('selectedCommunityId', communityId);

    // update apollo cache
    client.writeQuery({
      query: GET_SELECTED_COMMUNITY,
      data: { selectedCommunity },
    });
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
