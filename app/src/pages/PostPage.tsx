import React, { useState, useRef } from 'react';
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
import Comment, { CommentData } from '../components/Comment';
import Post from '../components/Post';
import NewCommentInput from '../components/NewCommentInput';
import './Page.css';
import './PostPage.css';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { Direction } from '../types/globalTypes';
import { SubmitComment_submitComment_comment } from '../types/SubmitComment';
import { GetPostVariables, GetPost } from '../types/GetPost';
import {
  GET_POST_BY_ID,
  GET_POST_COMMENTS_ONLY,
} from '../common/graphql/posts';
import update from 'immutability-helper';
import PostSkeleton from '../components/PostSkeleton';

const COMMENT_PAGE_LIMIT = 3;

const Postpage: React.FC = () => {
  const newCommentElement = useRef<HTMLIonTextareaElement>(null);
  const { id: postId } = useParams();
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(
    false
  );

  const postVariables: GetPostVariables = {
    // TODO: get community id from somewhere
    communityId: 'HW6lY4kJOpqSpL39hbUV',
    postId: postId!,
    // TODO: Connect sorting to UI
    sortCommentsBy: {
      property: 'creationTimestamp',
      direction: Direction.ASC,
    },
    commentsLimit: COMMENT_PAGE_LIMIT,
  };
  const { data, loading, error, fetchMore, updateQuery } = useQuery<
    GetPost,
    GetPostVariables
  >(GET_POST_BY_ID, { variables: postVariables });

  const getMoreComments = async (e: CustomEvent<void>) => {
    await fetchMore({
      query: GET_POST_COMMENTS_ONLY,
      variables: {
        ...postVariables,
        commentsCursor: data?.post?.comments?.cursor,
      },
      // Update the cache with the newly fetched results
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newComments = fetchMoreResult?.post?.comments?.items;
        const previousComments = previousResult.post?.comments?.items;
        const newCursor = fetchMoreResult?.post?.comments?.cursor;

        // If a full page hasn't been returned we have reached the end
        if (newComments?.length !== COMMENT_PAGE_LIMIT) {
          setDisableInfiniteScroll(true);
        }

        const updatedComments = {
          items: [...previousComments!, ...newComments!],
          cursor: newCursor!,
          __typename: previousResult.post?.comments!.__typename,
        };

        // cannot modify previousResult as Apollo uses this to detect changes
        // and trigger re-renders
        const newResult = update(previousResult, {
          post: {
            comments: { $set: updatedComments },
          },
        });

        return newResult;
      },
    });

    (e.target as HTMLIonInfiniteScrollElement).complete();
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

  const handleReply = (author: string) => {
    newCommentElement.current!.setFocus();
    newCommentElement.current!.value = `@${author} `;
  };

  return (
    <IonPage>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/posts" text="Back" />
          </IonButtons>
          <IonTitle className="ion-text-start">Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="PostReadOnly">
          {(loading && <PostSkeleton />) ||
            (data?.post && (
              <Post
                {...data.post}
                onCommentClick={() => newCommentElement.current!.setFocus()}
                collapsable={false}
              />
            ))}
        </div>
        <NewCommentInput
          onCommentCreated={handleCommentCreated}
          inputRef={newCommentElement}
          postId={postId}
        />
        <IonCard>
          {(loading && (
            <IonCardContent className="ion-text-center">
              <IonSpinner />
            </IonCardContent>
          )) ||
            (data?.post?.comments?.items && (
              <>
                <IonList>
                  {data?.post?.comments?.items.map(
                    (comment: CommentData | null, i: number) => (
                      <Comment key={i} {...comment!} onReply={handleReply} />
                    )
                  )}
                </IonList>
                <IonInfiniteScroll
                  threshold="100px"
                  disabled={disableInfiniteScroll}
                  onIonInfinite={getMoreComments}
                >
                  <IonInfiniteScrollContent loadingText="Loading more comments..." />
                </IonInfiniteScroll>
              </>
            ))}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Postpage;
