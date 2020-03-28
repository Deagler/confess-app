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
  IonText,
} from '@ionic/react';
import React from 'react';
import { timeOutline, heart, chatbox, shareSocial } from 'ionicons/icons';
import moment from 'moment';
import './Comment.css';

export interface CommentProps {
  date: Date;
  content: string;
  author: string;
  university: string;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { date, content, author, university } = props;

  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem lines="none">
              <IonLabel slot="start">
                <h6>
                  {author} - {university}
                </h6>
              </IonLabel>
              <IonIcon color="medium" icon={timeOutline} size="medium" />
              <IonLabel color="medium">
                <h6>{moment(date).fromNow()} </h6>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>{content}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem lines="none">
              <IonButton fill="clear" expand="full" color="medium">
                <IonIcon color="medium" icon={heart} />
                <IonLabel>11</IonLabel>
              </IonButton>
              <IonButton fill="clear" expand="full" color="medium">
                <IonIcon color="medium" icon={chatbox} />
              </IonButton>
              <IonButton fill="clear" expand="full" color="medium">
                <IonIcon icon={shareSocial} />
              </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default Comment;
