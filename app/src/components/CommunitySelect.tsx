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
import { css, select } from 'glamor';
import { useHistory, useLocation } from 'react-router';
import { useSelectedCommunityQuery } from '../customHooks/community';

const communityThumbnail = css({
  width: '48px !important',
  height: '48px !important',
});

const CommunitySelect: React.FC<{}> = () => {
  const { loading, data, error } = useQuery<GetCommunities>(GET_COMMUNITIES);

  const {
    data: selectedCommData,
    loading: selectedCommunityLoading,
    communityId,
  } = useSelectedCommunityQuery();
  const history = useHistory();
  const location = useLocation();

  const handleCommunityChange = (newId: string) => {
    let pathname = location.pathname;

    localStorage.setItem('selectedCommunityId', newId);
    pathname = pathname.replace(communityId!, newId);

    history.push(pathname);
  };
  console.log(selectedCommData, communityId);
  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <Autocomplete
        id="community-selector"
        options={data?.communities || []}
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
