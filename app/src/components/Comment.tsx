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

export interface UserData {
  firstName: string;
  lastName: string;
  communityUsername: string;
}

export interface CommentData {
  creationTimestamp: number;
  // TODO: Update once user resolvers are written
  author?: UserData | null;
  content: string;
  totalLikes: number;
  likes?: (UserData | null)[];
}

export interface CommentProps extends CommentData {
  onReply: (author: string) => void;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { content, author, onReply, creationTimestamp, totalLikes } = props;
  const authorDisplayName = author
    ? `${author.firstName} ${author.lastName} (${author.communityUsername})`
    : 'unknown';

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
                <h6>{authorDisplayName}</h6>
              </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol size="12" size-sm="6">
            <IonItem lines="none">
              <IonIcon color="medium" icon={timeOutline} size="medium" />
              <IonLabel color="medium">
                <h6>{moment.unix(creationTimestamp).fromNow()} </h6>
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
                <IonLabel>{totalLikes}</IonLabel>
              </IonButton>
              <IonButton
                fill="clear"
                expand="full"
                color="medium"
                onClick={() => onReply(authorDisplayName)}
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
