import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonCard,
  IonList,
} from '@ionic/react';
import Comment, { CommentProps } from '../components/Comment';
import Post, { PostProps } from '../components/Post';
import NewCommentInput from '../components/NewCommentInput';

const Postpage: React.FC = () => {
  const [comments, setComments] = useState<CommentProps[]>(testComments);

  const handleSubmitComment = (newCommentContent: string) => {
    // TODO: Add comment mutation and get the author details from the user context

    const newCommentProp: CommentProps = {
      date: new Date(),
      content: newCommentContent,
      author: 'efgh456',
      university: 'UoA',
    };

    setComments((oldComments) => [newCommentProp, ...oldComments]);
  };

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
        <Post {...testPost} />
        <NewCommentInput onSubmitComment={handleSubmitComment} />
        <IonCard>
          <IonList>
            {comments.map((comment: CommentProps, i: number) => (
              <Comment key={i} {...comment} />
            ))}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Postpage;

const testPost: PostProps = {
  id: 1,
  title: 'This is the title',
  date: new Date(),
  content: 'This is the content',
  author: 'This is the author',
};

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
