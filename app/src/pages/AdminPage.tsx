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
} from '@ionic/react';

import PostRequest from '../components/PostRequest';
import FeedSkeleton from '../components/FeedSkeleton';
import { usePaginatedUnapprovedPostsQuery } from '../customHooks/pagination';

const AdminPage: React.FC = () => {
  const {
    loading,
    data,
    error,
    refetch,
    hasMorePosts,
    fetchMorePosts,
  } = usePaginatedUnapprovedPostsQuery();

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
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
          {loading ? (
            <FeedSkeleton />
          ) : (
            !error &&
            data?.community?.unapprovedPosts.items &&
            data.community.unapprovedPosts.items.map((post, i: number) => (
              <PostRequest key={i} {...post} onModeration={() => refetch()} />
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
