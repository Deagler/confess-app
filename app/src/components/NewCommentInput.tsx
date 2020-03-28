import { IonCard, IonTextarea, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
const NewCommentInput: React.FC<{}> = () => {
  const [text, setText] = useState<string>();

  return (
    <IonCard>
      <IonCardContent>
        <IonTextarea
          placeholder="Write a comment..."
          value={text}
          onIonChange={(e) => {
            setText(e.detail.value!);
          }}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default NewCommentInput;
