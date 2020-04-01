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
} from '@ionic/react';
import React, { useState, RefObject } from 'react';
import { send } from 'ionicons/icons';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_COMMENT } from '../common/graphql/comments';
import {
  SubmitComment_submitComment,
  SubmitCommentVariables,
  SubmitComment,
} from '../types/SubmitComment';
import { CommentData } from './Comment';

export interface NewCommentInputProps {
  onCommentCreated: (newCommentContent: CommentData) => void;
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
  const [content, setContent] = useState<string>();

  const handleSubmit = async () => {
    // TODO: add input validation and retrieve communityId from somewhere
    const { data } = await submitComment({
      variables: {
        communityId: 'HW6lY4kJOpqSpL39hbUV',
        postId: postId!,
        content: content!,
      },
    });

    const createdComment = data?.submitComment?.comment;
    if (data?.submitComment?.success && createdComment) {
      setContent('');
      onCommentCreated(createdComment);
    } else {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLIonTextareaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false && content) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonTextarea
                  placeholder="Write a comment..."
                  value={content}
                  onKeyDown={handleKeyDown}
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
                disabled={!content || !postId}
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
      </IonCardContent>
    </IonCard>
  );
};

export default NewCommentInput;
