import React from 'react';
import {
  IonLabel,
  IonSpinner,
  IonThumbnail,
  IonImg,
  IonToast,
} from '@ionic/react';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GetCommunities } from '../types/GetCommunities';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import { css } from 'glamor';
import { useHistory, useLocation } from 'react-router';

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

  const client = useApolloClient();
  const history = useHistory();
  const location = useLocation();

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

    history.push(`${location.pathname}?community=${communityId}`);
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
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
    </>
  );
};

export default CommunitySelect;
