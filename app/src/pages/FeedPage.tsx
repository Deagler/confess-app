import React from 'react';
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
  IonCard,
} from '@ionic/react';

import Post, { PostProps } from '../components/Post';
import { RouteComponentProps } from 'react-router';
import { GET_COMMUNITY_POSTS } from '../common/graphql/posts';

const FeedPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { loading, data } = useQuery(GET_COMMUNITY_POSTS, {
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
          <IonCard>
            <IonSkeletonText animated={true} style={{ height: '200px' }} />
          </IonCard>
        ) : (
          data.community.feed.map((post: PostProps, i: number) => (
            <Post
              key={i}
              {...post}
              onCommentClick={() => history.push(`/page/posts/${post.id}`)}
            />
          ))
        )}
      </IonContent>

      <IonFooter>
        <IonButton
          expand="block"
          routerLink="/page/submit"
          routerDirection="forward"
        >
          New Confession
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FeedPage;
