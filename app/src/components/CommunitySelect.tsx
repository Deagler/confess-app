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
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonSelect
        interfaceOptions={popoverOptions}
        interface="popover"
        placeholder="Select University"
        onIonChange={handleCommunityChange}
        // value={selectedCommunity}
      >
        {loading ? (
          <IonSpinner />
        ) : (
          !error &&
          data &&
          data!.communities.map((community, index: number) => (
            <IonSelectOption key={index} value={community?.id}>
              <IonLabel>{community?.name}</IonLabel>
            </IonSelectOption>
          ))
        )}
      </IonSelect>
    </>
  );
};

export default CommunitySelect;
