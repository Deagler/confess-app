import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonToast,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
} from '@ionic/react';

import PostRequest from '../components/PostRequest';
import FeedSkeleton from '../components/FeedSkeleton';
import { usePaginatedUnapprovedPostsQuery } from '../customHooks/pagination';
import update from 'immutability-helper';
import { appPageCSS } from '../theme/global';

const AdminPage: React.FC = () => {
  const {
    loading,
    data,
    error,
    updateQuery,
    hasMorePosts,
    fetchMorePosts,
  } = usePaginatedUnapprovedPostsQuery();

  const handlePostRemoval = (index: number) => {
    // Remove the moderated post from the cache
    updateQuery((currentPosts) => {
      return update(currentPosts, {
        community: {
          unapprovedPosts: {
            items: { $splice: [[index, 1]] },
          },
        },
      });
    });
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonPage {...appPageCSS}>
        <IonHeader className="ion-hide-lg-up">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Admin Portal</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <h4 className="ion-hide-lg-down ion-margin-top">
            <strong>Admin Portal</strong>
          </h4>
          {loading ? (
            <FeedSkeleton />
          ) : (
            !error &&
            data?.community?.unapprovedPosts.items &&
            data.community.unapprovedPosts.items.map((post, index: number) => (
              <PostRequest
                key={index}
                {...post}
                onModeration={() => handlePostRemoval(index)}
              />
            ))
          )}
          <br />
          <IonInfiniteScroll
            threshold="100px"
            disabled={!hasMorePosts}
            onIonInfinite={fetchMorePosts}
          >
            <IonInfiniteScrollContent loadingText="Loading more confessions..." />
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminPage;
