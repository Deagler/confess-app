import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from '@ionic/react';
import React from 'react';
import { timeOutline, heart, chatbox, star } from 'ionicons/icons';
import moment from 'moment';
import './Comment.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { GetLocalUser } from '../types/GetLocalUser';
import {
  SERVER_TOGGLE_LIKE_COMMENT,
  TOGGLE_STAR_COMMENT,
} from '../common/graphql/comments';
import ButtonDisabledTooltip from './ButtonDisabledTooltip';
import { useSelectedCommunity } from '../customHooks/location';
import { css } from 'glamor';
import { firebaseAnalytics } from '../services/firebase';
import { Tooltip } from '@material-ui/core';
interface CommunityData {
  abbreviation: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  communityUsername: string;
  community: CommunityData | null;
  starCount?: number | null;
}

export interface CommentData {
  id: string;
  creationTimestamp: number;
  // TODO: Update once user resolvers are written
  author?: UserData | null;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean | null;
  isStarred: boolean | null;
}

export interface CommentProps extends CommentData {
  onReply: (author: string) => void;
  postIdForComment: string | undefined;
  isOriginalPoster?: boolean;
}

const timeLabelContainer = css({
  display: 'flex',
  flexDirection: 'row',
  '@media(min-width: 768px)': {
    position: 'absolute',
    right: '10px',
  },
});

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const {
    id,
    content,
    author,
    onReply,
    creationTimestamp,
    totalLikes,
    isCommentLikedByUser,
    postIdForComment,
    isOriginalPoster,
    isStarred,
  } = props;
  const authorDisplayName = author
    ? `${author.firstName} ${author.lastName}`
    : 'unknown';
  const authorCommunity = author?.community?.abbreviation ?? '';

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });

  const communityId = useSelectedCommunity();
  const userLoggedIn = !!localUserQuery.data?.localUser;
  const userHasCommunity = !!localUserQuery.data?.localUser?.community;
  // TODO: Add liking mutation, and fetch liked status
  const [serverToggleLike, serverLikeInfo] = useMutation(
    SERVER_TOGGLE_LIKE_COMMENT
  );
  const handleLikeButtonClick = async (
    postId: string | undefined,
    commentId: string
  ) => {
    if (serverLikeInfo.loading) {
      return;
    }

    await serverToggleLike({
      variables: {
        communityId,
        postId,
        commentId,
      },
      optimisticResponse: {
        toggleLikeComment: {
          code: 200,
          message: 'Comment liked.',
          success: true,
          comment: {
            id,
            isCommentLikedByUser: !isCommentLikedByUser,
            totalLikes: isCommentLikedByUser ? totalLikes - 1 : totalLikes + 1,
            __typename: 'Comment',
          },
          __typename: 'CommentUpdatedResponse',
        },
      },
    });

    firebaseAnalytics.logEvent('comment_liked', {
      communityId,
      postId,
      commentId,
    });
  };

  const [toggleStar, toggleStarInfo] = useMutation(TOGGLE_STAR_COMMENT);
  const handleStar = async () => {
    if (toggleStarInfo.loading) {
      return;
    }

    if (!communityId || !postIdForComment) {
      console.error(
        'communityId and postIdForComment must be defined to star a post'
      );
      return;
    }

    await toggleStar({
      variables: {
        communityId,
        postId: postIdForComment,
        commentId: id,
      },
      optimisticResponse: {
        toggleStarComment: {
          code: '200',
          message: 'Comment starred.',
          success: true,
          comment: {
            id,
            isStarred: !isStarred,
            __typename: 'Comment',
          },
          __typename: 'CommentUpdatedResponse',
        },
      },
    });
  };

  return (
    <>
      <IonToast
        isOpen={!!serverLikeInfo.error || !!toggleStarInfo.error}
        message={serverLikeInfo.error?.message}
        duration={2000}
      />
      <IonItem
        style={{
          borderTop: isStarred ? 'solid 5px var(--ion-color-warning)' : 'none',
        }}
      >
        <IonGrid>
          <IonRow>
            <IonCol size-md="6" size-xs="12">
              <div>
                <IonLabel>
                  <h6>
                    {authorDisplayName} <span>&middot;</span> {authorCommunity}
                    <span>&middot;</span> {`${author?.starCount} Stars`}
                  </h6>
                </IonLabel>
              </div>
            </IonCol>
            <IonCol
              {...timeLabelContainer}
              size-md="auto"
              size-xs="12"
              offset-xs="0"
            >
              <IonIcon color="medium" icon={timeOutline} size="medium" />
              <IonLabel color="medium">
                <h6>{moment.unix(creationTimestamp).fromNow()} </h6>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>{content}</p>
            </IonCol>
          </IonRow>
          {isStarred && (
            <IonRow>
              <IonCol>
                <p>
                  <em>
                    The Original Poster has marked this comment as helpful.
                  </em>
                </p>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <ButtonDisabledTooltip
                  action="like this comment"
                  userLoggedIn={userLoggedIn}
                  userHasCommunity={userHasCommunity}
                >
                  <IonButton
                    onClick={() => handleLikeButtonClick(postIdForComment, id)}
                    fill="clear"
                    expand="full"
                    disabled={
                      !userLoggedIn ||
                      serverLikeInfo.loading ||
                      !userHasCommunity
                    }
                  >
                    <IonIcon
                      color={isCommentLikedByUser ? 'danger' : 'primary'}
                      icon={heart}
                    />
                    <IonLabel
                      color={isCommentLikedByUser ? 'danger' : 'primary'}
                    >
                      {totalLikes}
                    </IonLabel>
                  </IonButton>
                </ButtonDisabledTooltip>

                <ButtonDisabledTooltip
                  action="reply"
                  userLoggedIn={userLoggedIn}
                  userHasCommunity={userHasCommunity}
                >
                  <IonButton
                    fill="clear"
                    expand="full"
                    color="medium"
                    disabled={!userLoggedIn || !userHasCommunity}
                    onClick={() => onReply(authorDisplayName)}
                  >
                    <IonIcon color="medium" icon={chatbox} />
                  </IonButton>
                </ButtonDisabledTooltip>

                {isOriginalPoster && (
                  <Tooltip
                    arrow={true}
                    enterTouchDelay={200}
                    title="Original Posters can star comments to mark them as helpful."
                    aria-label="star"
                  >
                    <IonButton
                      fill="clear"
                      expand="full"
                      onClick={handleStar}
                      disabled={toggleStarInfo.loading}
                    >
                      <IonIcon color="warning" icon={star} />
                    </IonButton>
                  </Tooltip>
                )}
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};

export default Comment;
