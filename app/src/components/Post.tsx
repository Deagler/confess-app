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
import {
  ToggleLikePostVariables,
  ToggleLikePost,
} from '../types/ToggleLikePost';
import './Post.css';
import { Link } from 'react-router-dom';
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks';
import { TOGGLE_LIKE_POST } from '../common/graphql/posts';
import { GET_USER_LIKE } from '../common/graphql/localState';
export interface PostData {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  authorAlias?: string;
}

export interface PostProps extends PostData {
  onCommentClick: () => void;
  // onLikeButtonClick: () => void;
  isExpanded?: boolean;
}
const Post: React.FC<PostProps> = (props: PostProps) => {
  const {
    id,
    title,
    creationTimestamp,
    content,
    authorAlias,
    isExpanded,
    totalLikes,
    totalComments,
    onCommentClick,
  } = props;

  const toggleLikePostQuery = useQuery(GET_USER_LIKE);
  const isLikedByUser: boolean = toggleLikePostQuery.data?.isLikedByUser;
  const [toggleLikePost] = useMutation<ToggleLikePost, ToggleLikePostVariables>(
    TOGGLE_LIKE_POST
  );

  const handleLikeButtonClick = async (
    communityId: string,
    postId: string
    // isLikedByUser: boolean
  ) => {
    // TODO: add input validation
    const { data } = await toggleLikePost({
      variables: {
        communityId: 'HW6lY4kJOpqSpL39hbUV',
        postId: id,
      },
    });

    console.log(data);
  };

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
        <IonCardContent className={isExpanded ? 'showText' : 'hideText'}>
          {content}
        </IonCardContent>
        <IonCardContent>{authorAlias || 'Anonymous'}</IonCardContent>
      </Link>
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
