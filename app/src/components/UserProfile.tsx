import React, { useState } from 'react';
import {
  IonSelectOption,
  IonSelect,
  IonList,
  IonButton,
  IonLabel,
  IonRow,
  IonPopover,
  IonItemDivider,
  IonTitle,
} from '@ionic/react';
import './UserProfile.css';

interface UniversityOption {
  title: string;
  id: string;
}

const UserProfile: React.FC<{}> = () => {
  const [university, setUniversity] = useState<string>();
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const customPopoverOptions = {
    header: 'University',
    message: "Which university's confessions would you like to see?",
  };

  const universities: UniversityOption[] = [
    {
      title: 'UoA',
      id: '1', // placeholder for now
    },
    {
      title: 'AUT',
      id: '2',
    },
    {
      title: 'Lincoln University',
      id: '3',
    },
    {
      title: 'Massey University',
      id: '4',
    },
    {
      title: 'University of Canterbury',
      id: '5',
    },
    {
      title: 'University of Waikato',
      id: '6',
    },
    {
      title: 'University of Otago',
      id: '7',
    },
    {
      title: 'Victoria University of Wellington',
      id: '8',
    },
  ];

  return (
    <IonList>
      <IonTitle>Confess</IonTitle>
      <IonSelect
        interfaceOptions={customPopoverOptions}
        interface="popover"
        placeholder="Select University"
        onIonChange={(e) => setUniversity(e.detail.value)}
        value={university}
      >
        {universities.map((uni: UniversityOption, index: number) => (
          <IonSelectOption key={index}>
            <IonLabel className="ion-text-nowrap">{uni.title}</IonLabel>
          </IonSelectOption>
        ))}
      </IonSelect>
      <IonRow className="ion-float-left ion-padding-start">
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <p>show log in form</p>
        </IonPopover>
        <IonButton expand="block" onClick={() => setShowPopover(true)}>
          LogIn
        </IonButton>
        <IonButton expand="block">SignUp</IonButton>
      </IonRow>

      <IonItemDivider />
    </IonList>
  );
};

export default UserProfile;
