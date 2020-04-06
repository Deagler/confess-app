import React, { useState, useRef } from 'react';
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
  IonToast,
} from '@ionic/react';
import { heart, chatbox, shareSocial } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { truncateString } from '../utils';

import './Post.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { GetLocalUser } from '../types/GetLocalUser';
import { SERVER_TOGGLE_LIKE_POST } from '../common/graphql/posts';
import { error } from 'console';

export interface PostData {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  isLikedByUser: boolean | null;
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
    isLikedByUser,
    collapsable,
  } = props;

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [serverToggleLike, serverLikeInfo] = useMutation(
    SERVER_TOGGLE_LIKE_POST
  );

  const handleLikeButtonClick = async (postId: string) => {
    if (serverLikeInfo.loading) {
      return;
    }

    await serverToggleLike({
      variables: {
        communityId: '', // comes from client subquery
        postId,
      },
      optimisticResponse: {
        toggleLikePost: {
          code: 200,
          message: 'Post liked.',
          success: true,
          post: {
            id,
            isLikedByUser: !isLikedByUser,
            totalLikes: isLikedByUser ? totalLikes - 1 : totalLikes + 1,
            __typename: 'Post',
          },
          __typename: 'PostUpdatedResponse',
        },
      },
    });
  };

  const handleShareClick = () => {
    setShowToast(false);
    let message;
    let newVariable: any;
    newVariable = window.navigator;
    if (newVariable.share && newVariable) {
      newVariable
        .share({
          title: 'Confess: ' + title,
          text: 'Confess completely anonymous post: \n' + content,
          url: window.location.href,
        })
        .then(() => (message = 'Successful share'))
        .catch(
          (errorMessage: string) => (message = 'Error sharing ' + errorMessage)
        );
    } else {
      setShowToast(true);
    }
  };

  return (
    <>
      <IonToast
        isOpen={showToast}
        message="Web Share API is not supported in your browser."
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
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
                disabled={!userLoggedIn || serverLikeInfo.loading}
                onClick={() => handleLikeButtonClick(id)}
                fill="clear"
                expand="full"
                color={isLikedByUser ? 'danger' : 'primary'}
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
              <IonButton
                onClick={handleShareClick}
                fill="clear"
                expand="full"
                color="primary"
              >
                <IonIcon icon={shareSocial} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};

export default Post;
