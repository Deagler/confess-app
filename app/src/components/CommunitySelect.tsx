import React from 'react';
import { IonSelect, IonSelectOption, IonLabel, IonToast } from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';
import { ApolloError } from 'apollo-boost';

export interface CommunitySelectProps {
  onCommunityChange(e: CustomEvent<SelectChangeEventDetail>): void;
  communityNames: string[];
  selectedCommunity?: string;
  loading: boolean;
  error?: ApolloError;
}

const CommunitySelect: React.FC<CommunitySelectProps> = (
  props: CommunitySelectProps
) => {
  const {
    loading,
    error,
    communityNames,
    onCommunityChange,
    selectedCommunity,
  } = props;

  const popoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonSelect
        interfaceOptions={popoverOptions}
        interface="popover"
        placeholder="Select University"
        onIonChange={onCommunityChange}
        value={selectedCommunity}
      >
        {loading ? (
          <IonSelectOption disabled={true}>
            <IonLabel>Loading...</IonLabel>
          </IonSelectOption>
        ) : (
          !error &&
          communityNames.map((name: string, index: number) => (
            <IonSelectOption key={index}>
              <IonLabel>{name}</IonLabel>
            </IonSelectOption>
          ))
        )}
      </IonSelect>
    </>
  );
};

export default CommunitySelect;
