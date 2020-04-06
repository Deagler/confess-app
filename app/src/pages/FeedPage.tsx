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
  IonCardTitle,
  IonLabel,
  IonIcon,
  IonCard,
} from '@ionic/react';

import Post from '../components/Post';
import { RouteComponentProps } from 'react-router';

import './Page.css';
import FeedSkeleton from '../components/FeedSkeleton';
import { usePaginatedFeedQuery } from '../customHooks/pagination';
import { appPageCSS } from '../theme/global';
import { chatbox } from 'ionicons/icons';

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
        <div className="contentContainer">
          <div className="ion-hide-lg-up ion-margin ion-padding">
            <IonButton
              expand="block"
              routerLink="/page/submit"
              routerDirection="forward"
            >
              <IonIcon color="white" slot="start" icon={chatbox} />
              New Confession
            </IonButton>
          </div>

          <h4 className="ion-hide-lg-down ion-margin-top">
            <strong>Feed</strong>
          </h4>

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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FeedPage;
