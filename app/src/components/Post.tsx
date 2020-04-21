import React, { useState, useEffect } from 'react';
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
import { heart, chatbox } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import MaterialUILink from '@material-ui/core/Link';
import moment from 'moment';

import { truncateString, buildLink } from '../utils';

import './Post.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { GetLocalUser } from '../types/GetLocalUser';
import { SERVER_TOGGLE_LIKE_POST } from '../common/graphql/posts';
import ButtonDisabledTooltip from './ButtonDisabledTooltip';
import { useSelectedCommunity } from '../customHooks/location';
import ShareButton from './ShareButton';
import { css } from 'glamor';
import { firebaseAnalytics } from '../services/firebase';
import { Chip } from '@material-ui/core';
import { GET_COMMUNITY_CHANNELS } from '../common/graphql/communities';
import { GetCommunityChannels } from '../types/GetCommunityChannels';
import { getDownloadUrl } from '../common/firebase/cloudStorage';

export interface PostData {
  id: string;
  postNumber?: number | null;
  title: string;
  creationTimestamp: number;
  content: string;
  totalLikes: number;
  totalComments: number;
  isLikedByUser: boolean | null;
  isOriginalPoster: boolean;
  authorAlias?: string | null;
  channelId: string;
  showChannel: boolean;
  imageRef?: string | null;
}

export interface PostProps extends PostData {
  onCommentClick: () => void;
  collapsable: boolean;
}

const MAX_CONTENT_LENGTH: number = 600;

const textColorCSS = css({
  color: 'var(--ion-text-color)',
});

const topBorderCSS = css({
  borderTop: 'solid 5px var(--ion-color-primary)',
});

const headerSubtitleCSS = css({
  display: 'flex',
  flex: '1',
  width: '100%',
});

const highlightAuthorCSS = css({
  fontWeight: 'bold !important',
  color: 'var(--ion-color-primary)',
});

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
    channelId,
    onCommentClick,
    isLikedByUser,
    isOriginalPoster,
    collapsable,
    showChannel,
    imageRef,
  } = props;

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });

  const userLoggedIn = !!localUserQuery.data?.localUser;
  const userHasCommunity = !!localUserQuery.data?.localUser?.community;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>();
  useEffect(() => {
    if (imageRef) {
      getDownloadUrl(imageRef)
        .then((url) => setImageURL(url))
        .catch((e) => console.error(e));
    }
  }, [imageRef]);

  const [serverToggleLike, serverLikeInfo] = useMutation(
    SERVER_TOGGLE_LIKE_POST
  );

  const communityId = useSelectedCommunity();
  const communityChannels = useQuery<GetCommunityChannels>(
    GET_COMMUNITY_CHANNELS,
    {
      variables: { communityId },
      skip: !communityId,
    }
  );

  const postChannel = communityChannels.data?.community?.channels?.find(
    (val) => val?.id == channelId
  );

  const handleLikeButtonClick = async (postId: string) => {
    if (serverLikeInfo.loading) {
      return;
    }

    await serverToggleLike({
      variables: {
        communityId: communityId!,
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

    firebaseAnalytics.logEvent('post_liked', {
      communityId,
      postId,
    });
  };

  return (
    <>
      <IonToast
        isOpen={!!serverLikeInfo.error}
        message={serverLikeInfo.error?.message}
        duration={2000}
      />

      <IonCard
        className="ion-margin"
        {...css(isOriginalPoster && topBorderCSS)}
      >
        <Link to={buildLink(`/posts/${id}`, communityId)} className="Link">
          <IonCardHeader>
            <div {...headerSubtitleCSS}>
              <IonCardSubtitle>
                {postNumber ? `#${postNumber}` : `Post ID: ${id}`}
              </IonCardSubtitle>

              <div style={{ flex: 1 }} />

              {showChannel && (
                <Chip
                  disabled={!postChannel}
                  size="small"
                  label={postChannel?.name || 'Loading...'}
                />
              )}
            </div>

            <IonCardTitle {...textColorCSS}>{title}</IonCardTitle>
            <IonCardSubtitle>
              {moment.unix(creationTimestamp).fromNow()}
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent {...textColorCSS}>
            {imageRef && <img src={imageURL} alt="post content" />}
            <p>
              {expanded || !collapsable
                ? content
                : truncateString(content, MAX_CONTENT_LENGTH)}
              {collapsable && content.length > MAX_CONTENT_LENGTH && (
                <MaterialUILink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? '\nSee Less' : 'See More'}
                </MaterialUILink>
              )}
            </p>
          </IonCardContent>

          <IonCardContent {...textColorCSS}>
            <p {...css(isOriginalPoster && highlightAuthorCSS)}>
              ~ {authorAlias || 'Anonymous'}
              {isOriginalPoster && ' (Your Confession)'}
            </p>
          </IonCardContent>
        </Link>

        <IonItemDivider color="white" />

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <ButtonDisabledTooltip
                action="like this confession"
                userLoggedIn={userLoggedIn}
                userHasCommunity={userHasCommunity}
              >
                <IonButton
                  disabled={
                    !userLoggedIn || serverLikeInfo.loading || !userHasCommunity
                  }
                  onClick={() => handleLikeButtonClick(id)}
                  fill="clear"
                  expand="full"
                  color={isLikedByUser ? 'danger' : 'primary'}
                >
                  <IonIcon icon={heart} />
                  <IonLabel>{totalLikes}</IonLabel>
                </IonButton>
              </ButtonDisabledTooltip>
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
              <ShareButton
                title={title}
                target={buildLink(`/posts/${id}`, communityId)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};

export default Post;
