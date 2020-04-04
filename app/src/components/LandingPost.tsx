import React from 'react';
import { Link } from 'react-router-dom';
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

const MAX_CONTENT_LENGTH: number = 600;

const truncateString = (str: string) => {
  if (str.length <= MAX_CONTENT_LENGTH) {
    return str;
  }

  return str.slice(0, MAX_CONTENT_LENGTH) + '...';
};

const LandingPost: React.FC<PostProps> = (props: PostProps) => {
  const { id, title, creationTimestamp, content, authorAlias } = props;

  return (
    <Link to={`/page/posts/${id}`} className="Link">
      <IonCardContent>
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {moment.unix(creationTimestamp).fromNow()}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{truncateString(content)}</IonCardContent>
        <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
      </IonCardContent>
    </Link>
  );
};

export default LandingPost;
