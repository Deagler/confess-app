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
import ButtonDisabledTooltip from '../components/ButtonDisabledTooltip';
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
  const userHasCommunity = !!localUserQuery.data?.localUser?.community;

  const communityId = useSelectedCommunity();
  const channelId = useSelectedChannel();
  console.log(channelId)

  // looks for more posts when channel changes
  useEffect(() => setHasMorePosts(true), [channelId, setHasMorePosts]);

  const userFromSelectedComm: boolean =
    communityId === localUserQuery.data?.localUser?.community?.id;

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
            <ButtonDisabledTooltip
              action="confess"
              userLoggedIn={userLoggedIn}
              userHasCommunity={userHasCommunity}
              userNotFromSelectedComm={!userFromSelectedComm}
            >
              <IonButton
                expand="block"
                routerLink={buildLink('/submit', communityId)}
                routerDirection="forward"
                disabled={
                  !userLoggedIn || !userHasCommunity || !userFromSelectedComm
                }
              >
                <IonIcon color="white" slot="start" icon={chatbox} />
                New Confession
              </IonButton>
            </ButtonDisabledTooltip>
          </div>

          <h4 className="ion-hide-lg-down ion-margin-top ion-margin-horizontal">
            <strong>Feed</strong>
          </h4>

          {(loading && <FeedSkeleton />) ||
            (data?.community?.feed?.items &&
              data?.community?.feed?.items.map((post, i: number) => (
                <Post
                  key={i}
                  {...post}
                  onCommentClick={() =>
                    history.push(buildLink(`/posts/${post.id}`, communityId))
                  }
                  collapsable={true}
                  showChannel={!channelId}
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
