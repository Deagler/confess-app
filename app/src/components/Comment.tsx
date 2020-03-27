import {
  IonCard,
  IonItem,
  IonLabel,
  IonIcon,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React from 'react';
import { timeOutline, heart, chatbox, shareSocial } from 'ionicons/icons';
import moment from 'moment';

export interface CommentProps {
  date: Date;
  content: string;
  author: string;
  university: string;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { date, content, author, university } = props;

  return (
    <IonCard>
      <IonItem lines="none">
        <IonLabel slot="start">
          {author} - {university}
        </IonLabel>
        <IonIcon color="medium" icon={timeOutline} />
        <IonLabel color="medium">{moment(date).fromNow()}</IonLabel>
      </IonItem>
      <IonCardContent>{content}</IonCardContent>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <IonButton fill="clear" expand="full" color="medium">
              <IonIcon color="medium" icon={heart} />
              <IonLabel>11</IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton fill="clear" expand="full" color="medium">
              <IonIcon color="medium" icon={chatbox} />
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton fill="clear" expand="full" color="medium">
              <IonIcon icon={shareSocial} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default Comment;
