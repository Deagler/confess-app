import {
  IonCard,
  IonTextarea,
  IonCardContent,
  IonItem,
  IonGrid,
  IonRow,
  IonButton,
  IonSpinner,
  IonIcon,
  IonCol,
  IonToast,
} from '@ionic/react';
import React, { useState, RefObject } from 'react';
import { send } from 'ionicons/icons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SUBMIT_COMMENT } from '../common/graphql/comments';
import {
  SubmitCommentVariables,
  SubmitComment,
  SubmitComment_submitComment_comment,
} from '../types/SubmitComment';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { isNullOrWhitespace } from '../utils';
import { GetLocalUser } from '../types/GetLocalUser';
import { useSelectedCommunity } from '../customHooks/location';
import { firebaseAnalytics } from '../services/firebase';

export interface NewCommentInputProps {
  onCommentCreated: (
    newCommentContent: SubmitComment_submitComment_comment
  ) => void;
  inputRef: RefObject<HTMLIonTextareaElement>;
  postId: string | undefined;
}

const NewCommentInput: React.FC<NewCommentInputProps> = ({
  onCommentCreated,
  inputRef,
  postId,
}) => {
  const [submitComment, { loading, error }] = useMutation<
    SubmitComment,
    SubmitCommentVariables
  >(SUBMIT_COMMENT);
  const communityId = useSelectedCommunity();
  const [content, setContent] = useState<string>();

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;
  const userHasCommunity = !!localUserQuery.data?.localUser?.community;

  const handleSubmit = async () => {
    // TODO: add input validation and retrieve communityId from somewhere
    try {
      const { data } = await submitComment({
        variables: {
          communityId: communityId!,
          postId: postId!,
          content: content!,
        },
      });
      firebaseAnalytics.logEvent('comment_created', {
        communityId,
        postId,
        commentId: data!.submitComment!.comment!.id,
      });
      // success
      setContent('');
      onCommentCreated(data!.submitComment!.comment!);
    } catch (e) {
      console.error(e);
      firebaseAnalytics.logEvent('exception', {
        description: `submit_comment/${e.message}`,
      });
    }
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonCard className="ion-margin">
        <IonCardContent>
          {userLoggedIn && userHasCommunity ? (
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonTextarea
                      placeholder="Write a comment..."
                      value={content}
                      onIonChange={(e) => {
                        setContent(e.detail.value!);
                      }}
                      autofocus={true}
                      rows={5}
                      ref={inputRef}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol
                  className="ion-text-end"
                  style={{ padding: '0px' }}
                  size="12"
                >
                  <IonButton
                    size="small"
                    disabled={isNullOrWhitespace(content) || !postId}
                    onClick={handleSubmit}
                  >
                    {(loading && <IonSpinner />) || (
                      <>
                        Submit
                        <IonIcon size="small" slot="icon-only" icon={send} />
                      </>
                    )}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="12" className="">
                  <h2>
                    {!userLoggedIn
                      ? 'You must be logged in to comment'
                      : "Sorry you can't comment yet. We'll be at your university soon though!"}
                  </h2>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default NewCommentInput;
