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

import PostRequest, { PostRequestProps } from '../components/PostRequest';

const FeedPage: React.FC = () => {
  const testPosts: PostRequestProps[] = [
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
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {posts.map((post: PostRequestProps, i: number) => (
          <PostRequest key={i} {...post} />
        ))}
      </IonContent>

      <IonFooter>
        <IonButton expand="block" href="/page/submit" routerDirection="forward">
          New Confession
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FeedPage;
