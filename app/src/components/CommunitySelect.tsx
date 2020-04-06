import React from 'react';
import {
  IonToast,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonSpinner,
  IonThumbnail,
  IonImg,
} from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GetCommunities } from '../types/GetCommunities';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import { css } from 'glamor';

const communityThumbnail = css({
  width: '48px !important',
  height: '48px !important',
});

const CommunitySelect: React.FC<{}> = () => {
  const { loading, data, error } = useQuery<GetCommunities>(GET_COMMUNITIES);
  const {
    loading: selectedCommunityLoading,
    data: selectedCommData,
  } = useQuery<GetSelectedCommunity>(GET_SELECTED_COMMUNITY);

  const popoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  const client = useApolloClient();

  const handleCommunityChange = (communityId) => {
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
      options={data?.communities || []}
      getOptionLabel={(option) => option?.abbreviation || ''}
      value={
        selectedCommData?.selectedCommunity
          ? selectedCommData!.selectedCommunity
          : null
      }
      getOptionSelected={(option, value) => {
        return option!.id == value!.id;
      }}
      onChange={(e, val) => handleCommunityChange(val.id)}
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
        !loading && !selectedCommunityLoading ? (
          <React.Fragment>
            <IonThumbnail slot="start">
              <IonImg {...communityThumbnail} src={option!.imageURI} />
            </IonThumbnail>
            <IonLabel>{option!.name}</IonLabel>
          </React.Fragment>
        ) : (
          'Loading...'
        )
      }
      loading={loading || selectedCommunityLoading}
    />
  );
};

export default CommunitySelect;
