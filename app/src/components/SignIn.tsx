import {
  IonSelectOption,
  IonSelect,
  IonLabel,
  IonList,
  IonButton,
  IonToolbar,
  IonListHeader,
} from '@ionic/react';
import React, { useState } from 'react';
import './Menu.css';
export const SignIn: React.FC = () => {
  const [university, setUni] = useState<string>();

  return (
    <IonList>
      <IonListHeader>University</IonListHeader>
      <IonSelect
        placeholder="Select University"
        onIonChange={(e) => setUni(e.detail.value)}
      >
        <IonSelectOption value="uoa">
          The University of Auckland
        </IonSelectOption>
        <IonSelectOption value="aut">
          Auckland University of Technology
        </IonSelectOption>
        <IonSelectOption value="uow">University of Waikato</IonSelectOption>
        <IonSelectOption value="mau">Massey University</IonSelectOption>
        <IonSelectOption value="uov">
          Victoria University of Wellington
        </IonSelectOption>
        <IonSelectOption value="uoc">University of Canterbury</IonSelectOption>
        <IonSelectOption value="liu">Lincoln University</IonSelectOption>
        <IonSelectOption value="uoo">University of Otago</IonSelectOption>
      </IonSelect>
      <IonToolbar>
        <IonButton slot="start">LogIn</IonButton>
        <IonButton slot="start">SignUp</IonButton>
      </IonToolbar>
    </IonList>
  );
};
