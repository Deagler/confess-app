import {
  IonCard,
  IonTextarea,
  IonCardContent,
  IonItem,
} from '@ionic/react';
import React, { useState, RefObject } from 'react';

export interface NewCommentInputProps {
  onSubmitComment: (newCommentContent: string) => void;
  inputRef: RefObject<HTMLIonTextareaElement>;
}

const NewCommentInput: React.FC<NewCommentInputProps> = ({
  onSubmitComment,
  inputRef,
}) => {
  const [text, setText] = useState<string>();

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
        <IonItem>
          <IonTextarea
            placeholder="Write a comment..."
            value={text}
            onKeyDown={handleKeyDown}
            onIonChange={(e) => {
              setText(e.detail.value!);
            }}
            autofocus
            ref={inputRef}
          />
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default NewCommentInput;
