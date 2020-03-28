import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
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
  IonSkeletonText,
} from '@ionic/react';

import Post, { PostProps } from '../components/Post';
import { GET_POST_BY_ID, GET_COMMUNITY_POSTS } from '../common/graphql/posts';

const FeedPage: React.FC = () => {
  const { loading, data, called } = useQuery(GET_COMMUNITY_POSTS, {
    variables: {
      id: 'HW6lY4kJOpqSpL39hbUV',
    },
  });

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
        {loading ? (
          <IonSkeletonText
            animated={true}
            style={{ width: '88%', height: '200px' }}
          />
        ) : (
          data.community.posts.map((post: PostProps, i: number) => (
            <Post key={i} {...post} />
          ))
        )}
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
