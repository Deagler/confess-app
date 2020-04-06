import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React from 'react';
import { timeOutline, heart, chatbox, shareSocial } from 'ionicons/icons';
import moment from 'moment';
import './Comment.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { GetLocalUser } from '../types/GetLocalUser';
import { SERVER_TOGGLE_LIKE_COMMENT } from '../common/graphql/comments';
interface CommunityData {
  abbreviation: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  communityUsername: string;
  community: CommunityData | null;
}

export interface CommentData {
  id: string;
  creationTimestamp: number;
  // TODO: Update once user resolvers are written
  author?: UserData | null;
  content: string;
  totalLikes: number;
  isCommentLikedByUser: boolean | null;
}

export interface CommentProps extends CommentData {
  onReply: (author: string) => void;
  postIdForComment: string | undefined;
}

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
  } = props;
  const authorDisplayName = author
    ? `${author.firstName} ${author.lastName} (${author.communityUsername})`
    : 'unknown';
  const authorCommunity = author?.community?.abbreviation ?? '';

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;
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
        communityId: '', // comes from client subquery
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
            isCommentLikedByUser: isCommentLikedByUser!,
            totalLikes: isCommentLikedByUser ? totalLikes - 1 : totalLikes + 1,
            __typename: 'Comment',
          },
          __typename: 'CommentUpdatedResponse',
        },
      },
    });
  };
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="12" size-sm="6">
            <IonItem lines="none">
              <IonLabel slot="start">
                <h6>
                  {authorDisplayName} <span>&middot;</span> {authorCommunity}
                </h6>
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
                onClick={() => handleLikeButtonClick(postIdForComment, id)}
                fill="clear"
                expand="full"
                disabled={!userLoggedIn || serverLikeInfo.loading}
              >
                <IonIcon
                  color={isCommentLikedByUser ? 'danger' : 'primary'}
                  icon={heart}
                />
                <IonLabel color={isCommentLikedByUser ? 'danger' : 'primary'}>
                  {totalLikes}
                </IonLabel>
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
