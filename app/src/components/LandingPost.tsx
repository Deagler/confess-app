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
    <h1>
      <IonCard className="ion-margin-vertical">
        <IonCardContent>
          <IonCardHeader>
            <IonCardSubtitle>{id}</IonCardSubtitle>
            <IonCardTitle>{title}</IonCardTitle>
            <IonCardSubtitle>
              {moment.unix(creationTimestamp).fromNow()}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{content}</IonCardContent>
          <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
        </IonCardContent>
      </IonCard>
    </h1>
  );
};

export default LandingPost;
