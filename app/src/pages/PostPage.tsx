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
import Post, { PostData } from '../components/Post';
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
          <Post
            {...testPost}
            onCommentClick={() => newCommentElement.current!.setFocus()}
            isExpanded={true}
          />
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

const testPost: PostData = {
  id: 'abc',
  title: 'This is the title',
  creationTimestamp: Math.round(new Date().getTime() / 1000),
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. In pellentesque massa placerat duis ultricies lacus. Et malesuada fames ac turpis egestas.\n\n Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Tortor aliquam nulla facilisi cras fermentum odio. Massa eget egestas purus viverra accumsan in nisl. Sit amet nisl suscipit adipiscing bibendum est ultricies. Nibh nisl condimentum id venenatis a. Felis eget nunc lobortis mattis aliquam faucibus purus in. Maecenas sed enim ut sem viverra. Tortor consequat id porta nibh venenatis cras. Porttitor leo a diam sollicitudin tempor id. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Feugiat in fermentum posuere urna nec. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper.' +
    'Libero enim sed faucibus turpis in eu mi bibendum neque. Quam pellentesque nec nam aliquam sem et tortor consequat. Semper auctor neque vitae tempus. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sollicitudin tempor id eu nisl.\n\n Nisi scelerisque eu ultrices vitae auctor eu augue. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Dis parturient montes nascetur ridiculus mus mauris. Imperdiet proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.' +
    'Viverra nam libero justo laoreet. In egestas erat imperdiet sed euismod. Imperdiet dui accumsan sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Sed adipiscing diam donec adipiscing. Felis eget velit aliquet sagittis id. Pharetra massa massa ultricies mi quis hendrerit dolor magna eget.\n\n Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Purus in mollis nunc sed id semper risus in hendrerit. Et netus et malesuada fames ac turpis. Sodales ut etiam sit amet nisl purus in mollis. Egestas tellus rutrum tellus pellentesque. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Sed vulputate odio ut enim. Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Mauris ultrices eros in cursus turpis.',
  authorAlias: 'This is the author',
  totalLikes: 11,
  totalComments: 23,
};
