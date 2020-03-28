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
import moment from 'moment';

import './Post.css';
import { Link } from 'react-router-dom';

export interface PostProps {
  id: number;
  title: string;
  date: Date;
  content: string;
  onCommentClick?: () => void;
  author?: string;
}

const Post: React.FC<PostProps> = (props: PostProps, selectedPost) => {
  const { id, title, date, content, author, onCommentClick } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <IonCard>
      <Link
        to={`/pages/posts/${id}`}
        style={{ textDecoration: 'none' }}
      >
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{moment(date).fromNow()}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className={isExpanded ? 'showText' : 'hideText'}>
          {content}
        </IonCardContent>
        <IonCardContent>{author || 'Anonymous'}</IonCardContent>
      </Link>
      <IonItemDivider />

      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <IonButton fill="clear" expand="full" color="primary">
              <IonIcon icon={heart} />
              <IonLabel>11</IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              onClick={() => onCommentClick!()}
              fill="clear"
              expand="full"
              color="primary"
            >
              <IonIcon icon={chatbox} />
              <IonLabel>23</IonLabel>
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
