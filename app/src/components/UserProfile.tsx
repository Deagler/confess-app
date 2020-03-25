import {
  IonSelectOption,
  IonSelect,
  IonList,
  IonButton,
  IonLabel,
  IonRow,
  IonPopover,
  IonHeader,
} from '@ionic/react';
import React, { useState } from 'react';
import './SideBar.css';
interface UniversityOption {
  title: string;
  id: string;
}
const customPopoverOptions = {
  header: 'University',
  subHeader: 'Select your university',
  message: 'Only select the university you currently enrol',
};
export const UserProfile: React.FC = (selectUniversity) => {
  const [university, setUniversity] = useState<string>();
  const [showPopover, setShowPopover] = useState(false);
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
      <IonHeader>Confess</IonHeader>
      <IonSelect
        interfaceOptions={customPopoverOptions}
        interface="popover"
        placeholder="Select University"
        onIonChange={(e) => setUniversity(e.detail.value)}
      >
        {universities.map((uni, index) => {
          return (
            <IonSelectOption key={index}>
              <IonLabel className="ion-text-nowrap">{uni.title}</IonLabel>
            </IonSelectOption>
          );
        })}
      </IonSelect>
      <IonRow className="ion-float-left ion-padding-start">
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={(e) => setShowPopover(false)}
        >
          {' '}
          <p>show log in form</p>
        </IonPopover>
        <IonButton expand="block" onClick={() => setShowPopover(true)}>
          LogIn
        </IonButton>
        <IonButton expand="block">SignUp</IonButton>
      </IonRow>
    </IonList>
  );
};
