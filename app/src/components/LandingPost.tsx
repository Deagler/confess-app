import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
  IonIcon,
  IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
  IonHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSlide,
  IonContent,
  IonTitle,
  IonSlides,
} from '@ionic/react';
import { person } from 'ionicons/icons';
import moment from 'moment';
import './Post.css';

export interface PostProps {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias?: string;
}

const LandingPost: React.FC<PostProps> = (props: PostProps) => {
  const { id, title, creationTimestamp, content, authorAlias } = props;

  return (
    <IonSlide className="ion-text-left ion-margin-vertical">
      <IonContent>
        <IonCardSubtitle>
          <IonLabel>{id}</IonLabel>
        </IonCardSubtitle>
        <IonCardTitle className="ion-margin-vertical">
          <IonLabel>{title}</IonLabel>
        </IonCardTitle>
        <IonCardContent>{content}</IonCardContent>
        <IonCardContent>
          <IonIcon icon={person} />
          {'Anonymous'}
        </IonCardContent>
      </IonContent>
    </IonSlide>
  );
};

export default LandingPost;
