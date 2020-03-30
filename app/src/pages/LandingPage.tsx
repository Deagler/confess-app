import React, { useState } from 'react';
import {
  IonPage,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonInput,
  IonButtons,
  IonTitle,
  IonButton,
} from '@ionic/react';

const LandingPage: React.FC = () => {
  const [text, setText] = useState<string>();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon icon="chatbox-ellipses-outline" />
          <IonTitle>Confess</IonTitle>
          <IonInput
            value={text}
            placeholder="Enter Input"
            onIonChange={(e) => setText(e.detail.value!)}
          />
          <IonButton>Get Started</IonButton>
        </IonToolbar>
      </IonHeader>

      {/* <IonContent>
            {posts.map((post: PostRequestProps, i: number) => (
              <PostRequest key={i} {...post} />
            ))}
          </IonContent> */}
    </IonPage>
  );
};

export default LandingPage;
