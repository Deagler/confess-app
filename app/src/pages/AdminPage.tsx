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
import update from 'immutability-helper';

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
