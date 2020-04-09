import React, { useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonIcon,
} from '@ionic/react';

import Post from '../components/Post';
import { RouteComponentProps } from 'react-router';

import './Page.css';
import FeedSkeleton from '../components/FeedSkeleton';
import { usePaginatedFeedQuery } from '../customHooks/pagination';
import { appPageCSS } from '../theme/global';
import { chatbox } from 'ionicons/icons';
import { useQuery } from '@apollo/react-hooks';
import { GetLocalUser } from '../types/GetLocalUser';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import LoginTooltip from '../components/LoginTooltip';
import { buildLink } from '../utils';
import {
  useSelectedCommunity,
  useSelectedChannel,
} from '../customHooks/location';

const FeedPage: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    data,
    loading,
    hasMorePosts,
    fetchMorePosts,
    setHasMorePosts,
  } = usePaginatedFeedQuery();

  const localUserQuery = useQuery<GetLocalUser>(GET_LOCAL_USER);
  const userLoggedIn = !!localUserQuery.data?.localUser;
  const communityId = useSelectedCommunity();
  const channelId = useSelectedChannel();

  // looks for more posts when channel changes
  useEffect(() => setHasMorePosts(true), [channelId, setHasMorePosts]);

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
            <LoginTooltip loginOrSignUpTo="confess" userLoggedIn={userLoggedIn}>
              <IonButton
                expand="block"
                routerLink={buildLink('/submit', communityId)}
                routerDirection="forward"
                disabled={!userLoggedIn}
              >
                <IonIcon color="white" slot="start" icon={chatbox} />
                New Confession
              </IonButton>
            </LoginTooltip>
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
                  onCommentClick={() =>
                    history.push(
                      buildLink(`/posts/${post.id}`, communityId, channelId)
                    )
                  }
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
