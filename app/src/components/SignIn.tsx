import {
  IonSelectOption,
  IonSelect,
  IonList,
  IonButton,
  IonLabel,
  IonRow,
  IonItem,
  IonInput,
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
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    // TODO: send email, confirm email then display email on the page
  };
  return (
    <IonList>
      <IonSelect
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
        <IonButton expand="block" onClick={() => LoginForm()}>
          LogIn
        </IonButton>
        <IonButton expand="block">SignUp</IonButton>
      </IonRow>
    </IonList>
  );
};
