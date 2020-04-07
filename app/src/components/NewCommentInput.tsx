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
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import {
  GET_SELECTED_COMMUNITY,
  GET_LOCAL_USER,
} from '../common/graphql/localState';
import { isNullOrWhitespace } from '../utils';
import { GetLocalUser } from '../types/GetLocalUser';
import { Tooltip } from '@material-ui/core';
import LoginTooltip from './LoginTooltip';

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
  const selectedCommunityQuery = useQuery<GetSelectedCommunity>(
    GET_SELECTED_COMMUNITY
  );
  const [content, setContent] = useState<string>();

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });
  const userLoggedIn = !!localUserQuery.data?.localUser;

  const handleSubmit = async () => {
    // TODO: add input validation and retrieve communityId from somewhere
    try {
      const { data } = await submitComment({
        variables: {
          communityId: selectedCommunityQuery.data!.selectedCommunity!.id,
          postId: postId!,
          content: content!,
        },
      });

      // success
      setContent('');
      onCommentCreated(data!.submitComment!.comment!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonCard>
        <IonCardContent>
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
                <LoginTooltip
                  loginOrSignUpTo={'leave a comment'}
                  userLoggedIn={userLoggedIn}
                  inline={true}
                >
                  <IonButton
                    size="small"
                    disabled={
                      isNullOrWhitespace(content) || !userLoggedIn || !postId
                    }
                    onClick={handleSubmit}
                  >
                    {(loading && <IonSpinner />) || (
                      <>
                        Submit
                        <IonIcon size="small" slot="icon-only" icon={send} />
                      </>
                    )}
                  </IonButton>
                </LoginTooltip>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default NewCommentInput;
