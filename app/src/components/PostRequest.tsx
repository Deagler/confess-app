import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';

import { APPROVE_POST } from '../common/graphql/admin';
import { ApprovePost, ApprovePostVariables } from '../types/ApprovePost';
import RejectPostModal from '../components/RejectPostModal';

export interface PostRequestProps {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  author?: string;
  onModeration(): void;
}

const PostRequest: React.FC<PostRequestProps> = (props: PostRequestProps) => {
  const { id, title, creationTimestamp, content, author, onModeration } = props;

  const [approvePost, { loading, error }] = useMutation<
    ApprovePost,
    ApprovePostVariables
  >(APPROVE_POST);

  const approveHandler = async () => {
    try {
      await approvePost({
        variables: {
          postId: id,
          communityId: 'HW6lY4kJOpqSpL39hbUV',
        },
      });

      // callback
      onModeration();
    } catch (error) {
      console.error(error);
    }
  };

  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <RejectPostModal
        postId={id}
        isOpen={rejectModalOpen}
        onDidDismiss={() => setRejectModalOpen(false)}
        onReject={onModeration}
      />
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {moment.unix(creationTimestamp).fromNow()}
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>{content}</IonCardContent>
        <IonCardContent>{author || 'Anonymous'}</IonCardContent>

        <IonItemDivider />

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonButton
                color="primary"
                fill="outline"
                expand="block"
                onClick={approveHandler}
              >
                {loading ? <IonSpinner /> : 'Approve'}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                color="danger"
                fill="outline"
                expand="block"
                onClick={() => setRejectModalOpen(true)}
              >
                Reject
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};

export default PostRequest;
