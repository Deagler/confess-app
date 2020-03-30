import React from 'react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { SelectChangeEventDetail } from '@ionic/core';

export interface CommunitySelectProps {
  onCommunityChange(e: CustomEvent<SelectChangeEventDetail>): void;
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
        communityNames &&
        communityNames.map((name: string, index: number) => (
          <IonSelectOption key={index}>
            <IonLabel>{name}</IonLabel>
          </IonSelectOption>
        ))
      )}
    </IonSelect>
  );
};

export default CommunitySelect;
