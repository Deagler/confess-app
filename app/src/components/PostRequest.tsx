import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
import moment from 'moment';

import './Post.css';

export interface PostRequestProps {
  id: number;
  title: string;
  date: Date;
  content: string;
  author?: string;
}

const PostRequest: React.FC<PostRequestProps> = (props: PostRequestProps) => {
  const { id, title, date, content, author } = props;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{moment(date).fromNow()}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{content}</IonCardContent>
      <IonCardContent>{author || 'Anonymous'}</IonCardContent>

      <IonItemDivider />

      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <IonButton expand="block">Approve</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="danger" expand="block">
              Deny
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default PostRequest;
