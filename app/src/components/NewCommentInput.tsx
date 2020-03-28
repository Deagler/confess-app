import { IonCard, IonTextarea, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';

export interface NewCommentInputProps {
  onSubmitComment: (newCommentContent: string) => void;
}

const NewCommentInput: React.FC<NewCommentInputProps> = ({
  onSubmitComment,
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
        <IonTextarea
          placeholder="Write a comment..."
          value={text}
          onKeyDown={handleKeyDown}
          onIonChange={(e) => {
            setText(e.detail.value!);
          }}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default NewCommentInput;
