import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
} from '@ionic/react';
import Comment, { CommentProps } from '../components/Comment';
import Post, { PostProps } from '../components/Post';

const Postpage: React.FC = () => {
  const testPosts: PostProps[] = [
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
      author: 'This is the author',
    },
  ];

  const [posts] = useState(testPosts);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/posts" text="Back" />
          </IonButtons>
          <IonTitle className="ion-text-start">Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {posts.map((post: PostProps, i: number) => (
          <Post key={i} {...post} />
        ))}
        {testComments.map((comment: CommentProps, i: number) => (
          <Comment key={i} {...comment} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Postpage;

const testComments: CommentProps[] = [
  {
    date: new Date(),
    content: 'Comment content',
    author: 'abcd123',
    university: 'UoA',
  },
  {
    date: new Date(),
    content: 'Comment content',
    author: 'abcd123',
    university: 'UoA',
  },
  {
    date: new Date(),
    content: 'Comment content',
    author: 'abcd123',
    university: 'UoA',
  },
];
