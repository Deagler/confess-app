import React from 'react';
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

export interface PostProps {
  id: number;
  title: string;
  creationTimestamp: number;
  content: string;
  authorName?: string;
}

const Post: React.FC<PostProps> = (props: PostProps) => {
  const { id, title, creationTimestamp, content, authorName } = props;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>
          {moment.unix(creationTimestamp).fromNow()}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{content}</IonCardContent>
      <IonCardContent>{authorName || 'Anonymous'}</IonCardContent>

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
            <IonButton fill="clear" expand="full" color="primary">
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
