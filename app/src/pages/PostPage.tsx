import React, { useState, useRef } from 'react';
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
import Comment, { CommentData } from '../components/Comment';
import Post, { PostProps } from '../components/Post';
import NewCommentInput from '../components/NewCommentInput';
import './PostPage.css';
const Postpage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>(testComments);
  const newCommentElement = useRef<HTMLIonTextareaElement>(null);

  const handleSubmitComment = (newCommentContent: string) => {
    // TODO: Add comment mutation and get the author details from the user context

    const newCommentProp: CommentData = {
      date: new Date(),
      content: newCommentContent,
      author: 'efgh456',
      university: 'UoA',
    };

    setComments((oldComments) => [newCommentProp, ...oldComments]);
  };

  const handleReply = (author: string) => {
    newCommentElement.current!.setFocus();
    newCommentElement.current!.value = `@${author} `;
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
      <IonContent className="PostReadOnly">
        <Post {...testPost} />
        <NewCommentInput
          onSubmitComment={handleSubmitComment}
          inputRef={newCommentElement}
        />
        <IonCard>
          <IonList>
            {comments.map((comment: CommentData, i: number) => (
              <Comment key={i} {...comment} onReply={handleReply} />
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

const testComments: CommentData[] = [
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
