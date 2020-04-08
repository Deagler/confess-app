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
  IonToast,
} from '@ionic/react';
import { heart, chatbox, shareSocial } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { truncateString, buildLink } from '../utils';

import './Post.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  GET_LOCAL_USER,
  GET_SELECTED_COMMUNITY,
} from '../common/graphql/localState';
import { GetLocalUser } from '../types/GetLocalUser';
import { SERVER_TOGGLE_LIKE_POST } from '../common/graphql/posts';
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import LoginTooltip from './LoginTooltip';
import {
  useSelectedCommunity,
  useSelectedChannel,
} from '../customHooks/location';

export interface PostData {
  id: string;
  postNumber?: number | null;
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
    postNumber,
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
  const selectedCommunityQuery = useQuery<GetSelectedCommunity>(
    GET_SELECTED_COMMUNITY
  );
  const [serverToggleLike, serverLikeInfo] = useMutation(
    SERVER_TOGGLE_LIKE_POST
  );
  const communityId = useSelectedCommunity();
  const channelId = useSelectedChannel();

  const handleLikeButtonClick = async (postId: string) => {
    if (serverLikeInfo.loading) {
      return;
    }

    await serverToggleLike({
      variables: {
        communityId: selectedCommunityQuery.data!.selectedCommunity!.id,
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

  return (
    <>
      <IonToast
        isOpen={!!serverLikeInfo.error}
        message={serverLikeInfo.error?.message}
        duration={2000}
      />
      <IonCard className="ion-margin">
        <Link
          to={buildLink(`/page/posts/${id}`, communityId, channelId)}
          className="Link"
        >
          <IonCardHeader>
            <IonCardSubtitle>
              {postNumber ? `#${postNumber}` : `Post ID: ${id}`}
            </IonCardSubtitle>
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

        <IonItemDivider color="white" />

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <LoginTooltip
                loginOrSignUpTo="like this confession"
                userLoggedIn={userLoggedIn}
              >
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
              </LoginTooltip>
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
    </>
  );
};

export default Post;
