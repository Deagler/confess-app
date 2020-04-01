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

export interface NewCommentInputProps {
  onSubmitComment: (newCommentContent: string) => void;
  inputRef: RefObject<HTMLIonTextareaElement>;
}

const NewCommentInput: React.FC<NewCommentInputProps> = ({
  onSubmitComment,
  inputRef,
}) => {
  const [text, setText] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLIonTextareaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false && text) {
      e.preventDefault();
      setText('');
      onSubmitComment(text);
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
                  value={text}
                  onKeyDown={handleKeyDown}
                  onIonChange={(e) => {
                    setText(e.detail.value!);
                  }}
                  autofocus={true}
                  rows={6}
                  ref={inputRef}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ padding: '0px' }} size="12">
              <div className="ion-text-end">
                <IonButton
                  size="small"
                  disabled={false}
                  onClick={() => setLoading(!loading)}
                >
                  {(loading && <IonSpinner />) || (
                    <>
                      {'Submit   '}
                      <IonIcon size="small" slot="icon-only" icon={send} />
                    </>
                  )}
                </IonButton>
              </div>{' '}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default NewCommentInput;
