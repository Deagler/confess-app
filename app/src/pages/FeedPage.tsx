import React from 'react';
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSplitPane,
} from '@ionic/react';

import Post from '../components/Post';
import { RouteComponentProps } from 'react-router';

import './Page.css';
import FeedSkeleton from '../components/FeedSkeleton';
import { usePaginatedFeedQuery } from '../customHooks/pagination';
import { appPageCSS } from '../components/WebHeader';

const FeedPage: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    data,
    loading,
    hasMorePosts,
    fetchMorePosts,
  } = usePaginatedFeedQuery();

  return (
    <IonPage {...appPageCSS}>
      <IonHeader id="header" className="ion-hide-lg-up">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTitle className="ion-hide-lg-down ion-padding-top">Feed</IonTitle>

        {(loading && <FeedSkeleton />) ||
          (data?.community?.feed?.items &&
            data?.community?.feed?.items.map((post, i: number) => (
              <Post
                key={i}
                {...post}
                onCommentClick={() => history.push(`/page/posts/${post.id}`)}
                collapsable={true}
              />
            )))}
        <br />
        <IonInfiniteScroll
          threshold="200px"
          disabled={!hasMorePosts}
          onIonInfinite={fetchMorePosts}
        >
          <IonInfiniteScrollContent loadingText="Loading more confessions..." />
        </IonInfiniteScroll>
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
