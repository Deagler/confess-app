import React, { useState } from 'react';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
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
    <h1 style={{ width: 'inherit' }}>
      <IonCardContent>
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {moment.unix(creationTimestamp).fromNow()}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{content}</IonCardContent>
        <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
      </IonCardContent>
    </h1>
  );
};

export default LandingPost;
