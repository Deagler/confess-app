import React, { useState } from 'react';
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
} from '@ionic/react';

import Post, { PostProps } from '../components/Post';
import { RouteComponentProps } from 'react-router';

const FeedPage: React.FC<RouteComponentProps> = ({ history }) => {
  const testPosts: PostProps[] = [
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. In pellentesque massa placerat duis ultricies lacus. Et malesuada fames ac turpis egestas. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Tortor aliquam nulla facilisi cras fermentum odio. Massa eget egestas purus viverra accumsan in nisl. Sit amet nisl suscipit adipiscing bibendum est ultricies. Nibh nisl condimentum id venenatis a. Felis eget nunc lobortis mattis aliquam faucibus purus in. Maecenas sed enim ut sem viverra. Tortor consequat id porta nibh venenatis cras. Porttitor leo a diam sollicitudin tempor id. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Feugiat in fermentum posuere urna nec. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper.' +
        'Libero enim sed faucibus turpis in eu mi bibendum neque. Quam pellentesque nec nam aliquam sem et tortor consequat. Semper auctor neque vitae tempus. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sollicitudin tempor id eu nisl. Nisi scelerisque eu ultrices vitae auctor eu augue. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Dis parturient montes nascetur ridiculus mus mauris. Imperdiet proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.' +
        'Viverra nam libero justo laoreet. In egestas erat imperdiet sed euismod. Imperdiet dui accumsan sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Sed adipiscing diam donec adipiscing. Felis eget velit aliquet sagittis id. Pharetra massa massa ultricies mi quis hendrerit dolor magna eget. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Purus in mollis nunc sed id semper risus in hendrerit. Et netus et malesuada fames ac turpis. Sodales ut etiam sit amet nisl purus in mollis. Egestas tellus rutrum tellus pellentesque. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Sed vulputate odio ut enim. Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Mauris ultrices eros in cursus turpis.',
      author: 'This is the author',
    },
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
      author: 'This is the author',
    },
    {
      id: 1,
      title: 'This is the title',
      date: new Date(),
      content: 'This is the content',
    },
  ];

  const [posts, setPosts] = useState(testPosts);

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
        {posts.map((post: PostProps, i: number) => (
          <Post
            key={i}
            {...post}
            onCommentClick={() => history.push(`/pages/posts/${post.id}`)}
          />
        ))}
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
