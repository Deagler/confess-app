import React from 'react';
import { Link } from 'react-router-dom';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
} from '@ionic/react';
import moment from 'moment';
import { css } from 'glamor';

export interface PostProps {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias?: string;
}

const postCard = css({
  width: '100%',
  height: '450px',
});

const postContent = css({
  height: '325px',
  marginBottom: '16px',
  maxHeight: '100%',
  overflow: 'auto',
});

const LandingPost: React.FC<PostProps> = (props: PostProps) => {
  const { id, title, creationTimestamp, content, authorAlias } = props;

  return (
    <IonCard {...postCard}>
      <IonCardHeader>
        <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>
          {moment.unix(creationTimestamp).fromNow()}
        </IonCardSubtitle>
      </IonCardHeader>
      <div {...postContent}>
        <IonCardContent>
          <p>{content}</p>
          <p>{authorAlias || 'Anonymous'}</p>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default LandingPost;
