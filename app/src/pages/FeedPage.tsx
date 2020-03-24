import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
} from '@ionic/react';

import Post, { PostProps } from '../components/Post';

const FeedPage: React.FC = () => {
  const testPosts: PostProps[] = [
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
        {posts.map((post: PostProps, i: number) => (
          <Post key={i} {...post} />
        ))}
      </IonContent>

      <IonFooter>
        <IonButton expand="block">New Confession</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FeedPage;
