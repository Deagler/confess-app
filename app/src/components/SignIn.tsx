import { IonSelectOption, IonSelect, IonLabel, IonList } from '@ionic/react';
import React, { useState } from 'react';
import './Menu.css';
export const SignIn: React.FC = () => {
  const [university, setUni] = useState<string>();

  return (
    <IonList>
      <IonLabel>University</IonLabel>
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
        <IonSelectOption value="uow">
          Victoria University of Wellington
        </IonSelectOption>
        <IonSelectOption value="uoc">University of Canterbury</IonSelectOption>
        <IonSelectOption value="liu">Lincoln University</IonSelectOption>
        <IonSelectOption value="uoo">University of Otago</IonSelectOption>
      </IonSelect>
    </IonList>
  );
};
