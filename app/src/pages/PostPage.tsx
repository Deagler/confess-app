import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonRow,
} from '@ionic/react';

import Post, { PostProps } from '../components/Post';
import { useParams, Route, useHistory } from 'react-router-dom';

const Postpage: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const testPosts: PostProps[] = [
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
            <IonBackButton defaultHref="/page/posts" text="Back" />
          </IonButtons>
          <IonTitle className="ion-text-start">Post</IonTitle>
        </IonToolbar>
      </IonHeader>{' '}
      <IonContent>
        {posts.map((post: PostProps, i: number) => (
          <Post key={i} {...post} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Postpage;
