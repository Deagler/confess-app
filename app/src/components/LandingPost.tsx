import React from 'react';
import { Link } from 'react-router-dom';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
import moment from 'moment';

import { truncateString } from '../utils';

import './Post.css';

export interface PostProps {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias?: string;
}

const MAX_CONTENT_LENGTH: number = 600;

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
        <IonCardContent>
          {truncateString(content, MAX_CONTENT_LENGTH)}
        </IonCardContent>
        <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
      </IonCardContent>
    </Link>
  );
};

export default LandingPost;
