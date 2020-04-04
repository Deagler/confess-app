import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonSkeletonText,
  IonToast,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';

import PostRequest, { PostRequestProps } from '../components/PostRequest';
import { GET_COMMUNITY_UNAPPROVED_POSTS } from '../common/graphql/admin';

const AdminPage: React.FC = () => {
  const { loading, data, error, refetch } = useQuery(
    GET_COMMUNITY_UNAPPROVED_POSTS,
    {
      variables: {
        id: 'HW6lY4kJOpqSpL39hbUV',
      },
    }
  );

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
            <IonCard>
              <IonSkeletonText animated={true} style={{ height: '200px' }} />
            </IonCard>
          ) : (
            !error &&
            data &&
            data.community.unapprovedPosts.map(
              (post: PostRequestProps, i: number) => (
                <PostRequest key={i} {...post} onModeration={() => refetch()} />
              )
            )
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminPage;
