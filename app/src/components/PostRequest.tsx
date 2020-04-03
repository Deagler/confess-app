import React from 'react';
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

export interface PostRequestProps {
  id: string;
  title: string;
  date: Date;
  content: string;
  author?: string;
  onApprove(): void;
}

const PostRequest: React.FC<PostRequestProps> = (props: PostRequestProps) => {
  const { id, title, date, content, author, onApprove } = props;

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
          moderatorId: 'aVyC8BFy1f5qGzXVwGSu',
        },
      });

      // callback
      onApprove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{`#${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{moment(date).fromNow()}</IonCardSubtitle>
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
              <IonButton color="danger" fill="outline" expand="block">
                Deny
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};

export default PostRequest;
