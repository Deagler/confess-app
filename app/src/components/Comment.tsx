import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React, { useState } from 'react';
import { timeOutline, heart, chatbox, shareSocial } from 'ionicons/icons';
import moment from 'moment';
import './Comment.css';

export interface CommentData {
  date: Date;
  content: string;
  author: string;
  university: string;
}

export interface CommentProps extends CommentData {
  onReply: (author: string) => void;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { date, content, author, university, onReply } = props;

  // TODO: Add liking mutation, and fetch liked status
  const [liked, setLiked] = useState<boolean>(false);
  const likedButtonColor: string = liked ? 'primary' : 'medium';

  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="12" size-sm="6">
            <IonItem lines="none">
              <IonLabel slot="start">
                <h6>
                  {author} - {university}
                </h6>
              </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol size="12" size-sm="6">
            <IonItem lines="none">
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
              <IonButton
                fill="clear"
                expand="full"
                color={likedButtonColor}
                onClick={() => setLiked(!liked)}
              >
                <IonIcon color={likedButtonColor} icon={heart} />
                {/* TODO: Will need to add actual data here lmao */}
                <IonLabel>{liked ? '12' : '11'}</IonLabel>
              </IonButton>
              <IonButton
                fill="clear"
                expand="full"
                color="medium"
                onClick={() => onReply(author)}
              >
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
