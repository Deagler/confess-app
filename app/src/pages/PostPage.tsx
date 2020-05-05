import React, { useRef } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonCard,
  IonList,
  IonToast,
  IonSpinner,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import Comment from '../components/Comment';
import Post from '../components/Post';
import NewCommentInput from '../components/NewCommentInput';
import './Page.css';
import './PostPage.css';
import { useParams } from 'react-router';
import { SubmitComment_submitComment_comment } from '../types/SubmitComment';
import update from 'immutability-helper';
import PostSkeleton from '../components/PostSkeleton';
import { usePaginatedPostQuery } from '../customHooks/pagination';
import { appPage } from '../styles/global';
import {
  useSelectedCommunity,
  useSelectedChannel,
} from '../customHooks/location';
import { buildLink } from '../utils';
import { firebaseAnalytics } from '../services/firebase';
import { GetPost_post_comments_items } from '../types/GetPost';
import CommentSortSelect from '../components/CommentSortSelect';

const Postpage: React.FC = () => {
  const newCommentElement = useRef<HTMLIonTextareaElement>(null);
  const { id: postId } = useParams();
  const {
    data,
    loading: postLoading,
    error,
    hasMoreComments,
    fetchMoreComments,
    sortCommentsBy,
    setSortCommentsBy,
    updateQuery,
  } = usePaginatedPostQuery(postId!);
  const loading = !data?.post && postLoading;

  const handleSortCommentsChange = (e) => {
    setSortCommentsBy(e.target.value);
  };

  const handleCommentCreated = (
    newComment: SubmitComment_submitComment_comment
  ) => {
    updateQuery((currentResult, _) => {
      // Update the cached query result to have the newly created comment

      const newResult = update(currentResult, {
        post: {
          comments: { items: { $unshift: [newComment] } },
          totalComments: { $set: currentResult?.post?.totalComments! + 1 },
        },
      });

      return newResult;
    });
  };
  const communityId = useSelectedCommunity();
  const channelId = useSelectedChannel();
  const handleReply = (author: string) => {
    firebaseAnalytics.logEvent('comment_reply_clicked', {
      author,
      postId,
      communityId,
    });
    newCommentElement.current!.setFocus();
    newCommentElement.current!.value = `@${author} `;
  };

  return (
    <IonPage {...appPage}>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonHeader className="ion-hide-lg-up">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={buildLink('/posts', communityId, channelId)}
              text="Back"
            />
          </IonButtons>
          <IonTitle className="ion-text-start">Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contentContainer">
          <div
            style={{ flex: 0, width: 'fit-content' }}
            className="ion-hide-lg-down ion-justify-self-start ion-margin-left"
          >
            <IonBackButton
              defaultHref={buildLink('/posts', communityId, channelId)}
              text="Back To Feed"
            />
          </div>
          <div className="PostReadOnly">
            {(loading && <PostSkeleton />) ||
              (data?.post && (
                <Post
                  {...data.post}
                  onCommentClick={() => newCommentElement.current!.setFocus()}
                  collapsable={false}
                  showChannel={true}
                />
              ))}
          </div>
          <NewCommentInput
            onCommentCreated={handleCommentCreated}
            inputRef={newCommentElement}
            postId={postId}
          />
          {(loading && (
            <IonCard className="ion-margin">
              <IonCardContent className="ion-text-center">
                <IonSpinner />
              </IonCardContent>
            </IonCard>
          )) ||
            (data?.post?.comments?.items.length !== 0 && (
              <>
                <CommentSortSelect
                  className="ion-margin-horizontal"
                  sortProperty={sortCommentsBy}
                  onSortPropertyChange={handleSortCommentsChange}
                />
                <IonCard className="ion-margin">
                  <IonList style={{ paddingTop: 0, paddingBottom: 0 }}>
                    {data?.post?.comments?.items.map(
                      (
                        comment: GetPost_post_comments_items | null,
                        i: number
                      ) => (
                        <Comment
                          key={i}
                          {...comment!}
                          onReply={handleReply}
                          postIdForComment={data?.post?.id}
                          isOriginalPoster={data?.post?.isOriginalPoster}
                          author={comment?.author!}
                        />
                      )
                    )}
                  </IonList>
                  <IonInfiniteScroll
                    threshold="100px"
                    className="ion-padding-top"
                    disabled={!hasMoreComments}
                    onIonInfinite={fetchMoreComments}
                  >
                    <IonInfiniteScrollContent loadingText="Loading more comments..." />
                  </IonInfiniteScroll>
                </IonCard>
              </>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Postpage;
