import React from 'react';
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
  postNumber: number | null;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias?: string | null;
}

const postCard = css({
  width: '100%',
  maxWidth: '100%',
  height: '450px',
});

const postContent = css({
  height: '325px',
  marginBottom: '16px',
  maxHeight: '100%',
  maxWidth: '100%',
  overflow: 'auto',
  whitespace: 'pre-line',
});

const LandingPost: React.FC<PostProps> = (props: PostProps) => {
  const { postNumber, title, creationTimestamp, content, authorAlias } = props;

  return (
    <IonCard {...postCard}>
      <IonCardHeader>
        <IonCardSubtitle>{`#${postNumber}`}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>
          {moment.unix(creationTimestamp).fromNow()}
        </IonCardSubtitle>
      </IonCardHeader>
      <div {...postContent}>
        <IonCardContent>
          <p>{content}</p>
        </IonCardContent>
        <IonCardContent>
          <p>~ {authorAlias || 'Anonymous'}</p>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default LandingPost;
