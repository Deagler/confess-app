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
import { gql } from 'apollo-boost';

const CommunitySelect: React.FC<{}> = () => {
  const { loading, data, error } = useQuery<GetCommunities>(GET_COMMUNITIES);

  const popoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  const client = useApolloClient();

  const handleCommunityChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const communityId = e.detail.value;

    // persist selected community across sessions
    localStorage.setItem('selectedCommunity', communityId);

    // update apollo cache
    client.writeQuery({
      query: gql`
        query getSelectedCommunity {
          selectedCommunity
        }
      `,
      data: { selectedCommunity: communityId },
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
