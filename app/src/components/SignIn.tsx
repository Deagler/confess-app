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
import './SignIn.css';
import { logIn } from 'ionicons/icons';
interface UniversityOption {
  title: string;
  id: string;
}
export const SignIn: React.FC = (selectedUni) => {
  const [university, setUni] = useState<string>();
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
        className=""
        interface="popover"
        placeholder="Select University"
        onIonChange={(e) => setUni(e.detail.value)}
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
