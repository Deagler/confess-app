import React from 'react';
import {
  IonLabel,
  IonSpinner,
  IonThumbnail,
  IonImg,
  IonToast,
} from '@ionic/react';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { useQuery } from '@apollo/react-hooks';
import { GetCommunities } from '../types/GetCommunities';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { css } from 'glamor';
import { useHistory } from 'react-router';
import { useSelectedCommunityQuery } from '../customHooks/community';
import { GetLocalUser } from '../types/GetLocalUser';
import { GET_LOCAL_USER } from '../common/graphql/localState';

const communityThumbnail = css({
  width: '48px !important',
  height: '48px !important',
});

const CommunitySelect: React.FC<{}> = () => {
  const { loading, data, error } = useQuery<GetCommunities>(GET_COMMUNITIES);
  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER);

  const {
    data: selectedCommData,
    loading: selectedCommunityLoading,
  } = useSelectedCommunityQuery();
  const history = useHistory();

  const handleCommunityChange = (newId: string) => {
    localStorage.setItem('selectedCommunityId', newId);
    history.push(`/${newId}/posts`);
  };

  let enabledCommunities =
    data?.communities?.filter((community) => community?.isEnabled) || [];

  if (localUserQuery.data?.localUser?.isAdmin) {
    enabledCommunities = data?.communities || [];
  }

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <Autocomplete
        id="community-selector"
        options={enabledCommunities}
        getOptionLabel={(option) => option?.abbreviation || ''}
        value={selectedCommData?.community ? selectedCommData!.community : null}
        getOptionSelected={(option, value) => {
          return option?.id === value?.id;
        }}
        onChange={(_e, val) => handleCommunityChange(val.id)}
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
                  {loading && <IonSpinner />}
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
