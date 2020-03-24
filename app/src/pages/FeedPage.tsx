import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/react';

import Post from '../components/Post';

const FeedPage: React.FC = () => {
  const testPosts = [
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
      author: 'This is the author',
    },
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
      author: 'This is the author',
    },
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
      author: 'This is the author',
    },
  ];

  const [posts, setPosts] = useState(testPosts);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {posts.map((post, i) => (
          <Post key={i} {...post} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default FeedPage;
