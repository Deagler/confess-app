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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';

import Post from '../components/Post';
import update from 'immutability-helper';
import { RouteComponentProps } from 'react-router';
import { GET_COMMUNITY_POSTS } from '../common/graphql/community';

import './Page.css';
import FeedSkeleton from '../components/FeedSkeleton';
import {
  GetCommunityPosts,
  GetCommunityPostsVariables,
} from '../types/GetCommunityPosts';
import { Direction } from '../types/globalTypes';

const POST_PAGE_LIMIT = 3;

const FeedPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [disableMorePosts, setDisableMorePosts] = useState<boolean>(false);

  const feedVariables: GetCommunityPostsVariables = {
    id: 'HW6lY4kJOpqSpL39hbUV',
    sortBy: {
      property: 'creationTimestamp',
      direction: Direction.DESC,
    },
    limit: POST_PAGE_LIMIT,
  };

  const { loading, data, fetchMore } = useQuery<
    GetCommunityPosts,
    GetCommunityPostsVariables
  >(GET_COMMUNITY_POSTS, {
    variables: feedVariables,
  });

  const getMorePosts = async (e: CustomEvent<void>) => {
    await fetchMore({
      query: GET_COMMUNITY_POSTS,
      variables: {
        ...feedVariables,
        cursor: data?.community?.feed.cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult?.community?.feed.items;

        console.log('fetch more res: ' + JSON.stringify(fetchMoreResult));
        // If a full page hasn't been returned we have reached the end
        if (newPosts?.length !== POST_PAGE_LIMIT) {
          setDisableMorePosts(true);
        }

        // cannot modify previousResult as Apollo uses this to detect changes to trigger re-renders
        return update(previousResult, {
          community: {
            feed: {
              items: { $push: newPosts! },
              cursor: { $set: fetchMoreResult?.community?.feed.cursor! },
            },
          },
        });
      },
    });
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

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
          disabled={disableMorePosts}
          onIonInfinite={getMorePosts}
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
