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
} from '@ionic/react';
import Comment, { CommentData } from '../components/Comment';
import Post, { PostData } from '../components/Post';
import NewCommentInput from '../components/NewCommentInput';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_LIKE_POST } from '../common/graphql/posts';
import './Page.css';
import './PostPage.css';
import { useParams } from 'react-router';

const Postpage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const newCommentElement = useRef<HTMLIonTextareaElement>(null);
  const { id: postId } = useParams();

  const handleCommentCreated = (newCommentProp: CommentData) => {
    setComments((oldComments) => [newCommentProp, ...oldComments]);
  };

  const handleReply = (author: string) => {
    newCommentElement.current!.setFocus();
    newCommentElement.current!.value = `@${author} `;
  };

  return (
    <IonPage>
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
        {comments.length !== 0 && (
          <IonCard>
            <IonList>
              {comments.map((comment: CommentData, i: number) => (
                <Comment key={i} {...comment} onReply={handleReply} />
              ))}
            </IonList>
          </IonCard>
        )}
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
