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
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
import { heart, chatbox, shareSocial } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { truncateString } from '../utils';

import './Post.css';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_LIKE_POST } from '../common/graphql/posts';
import { ToggleLikePost } from '../types/ToggleLikePost';

export interface PostData {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  authorAlias?: string | null;
}

export interface PostProps extends PostData {
  onCommentClick: () => void;
  collapsable: boolean;
}

const MAX_CONTENT_LENGTH: number = 600;

const Post: React.FC<PostProps> = (props: PostProps) => {
  const {
    id,
    title,
    creationTimestamp,
    content,
    authorAlias,
    totalLikes,
    totalComments,
    onCommentClick,
    collapsable,
  } = props;

  const [expanded, setExpanded] = useState<boolean>(false);

  const [toggleLikeMutation] = useMutation<ToggleLikePost>(TOGGLE_LIKE_POST);

  return (
    <IonCard>
      <Link to={`/page/posts/${id}`} className="Link">
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {moment.unix(creationTimestamp).fromNow()}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            {expanded || !collapsable
              ? content
              : truncateString(content, MAX_CONTENT_LENGTH)}
          </p>
        </IonCardContent>
        <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
      </Link>

      <IonButton fill="clear" onClick={() => setExpanded(!expanded)}>
        {collapsable &&
          content.length > MAX_CONTENT_LENGTH &&
          (expanded ? 'See Less' : 'See More')}
      </IonButton>

      <IonItemDivider />

      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <IonButton
              onClick={() => handleLikeButtonClick('adasdsa', id)}
              fill="clear"
              expand="full"
              color="primary"
            >
              <IonIcon icon={heart} />
              <IonLabel>{totalLikes}</IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              onClick={onCommentClick}
              fill="clear"
              expand="full"
              color="primary"
            >
              <IonIcon icon={chatbox} />
              <IonLabel>{totalComments}</IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton fill="clear" expand="full" color="primary">
              <IonIcon icon={shareSocial} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default Post;
