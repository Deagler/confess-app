import React, { useState } from 'react';
import {
  IonModal,
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonList,
  IonLabel,
  IonItem,
  IonFooter,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { useMutation } from '@apollo/react-hooks';

import { REJECT_POST } from '../common/graphql/admin';
import { RejectPost, RejectPostVariables } from '../types/RejectPost';

export interface RejectPostModalProps {
  postId: string;
  isOpen: boolean;
  onDidDismiss(): void;
}

const RejectPostModal: React.FC<RejectPostModalProps> = ({
  postId,
  isOpen,
  onDidDismiss,
}) => {
  const [rejectPost, { loading, error }] = useMutation<
    RejectPost,
    RejectPostVariables
  >(REJECT_POST);

  const [reason, setReason] = useState<string>('');

  const handleReject = async () => {
    try {
      // reject post
      await rejectPost({
        variables: {
          postId,
          communityId: 'HW6lY4kJOpqSpL39hbUV',
          moderatorId: 'aVyC8BFy1f5qGzXVwGSu',
          reason,
        },
      });

      // close dialog
      onDidDismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reject Post</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onDidDismiss}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen={true}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Reason</IonLabel>
              <IonInput
                placeholder="What is the reason for rejecting this post?"
                type="text"
                value={reason}
                onIonChange={(e) => setReason(e.detail.value!)}
                autocorrect="on"
                spellcheck={true}
              />
            </IonItem>
          </IonList>
        </IonContent>

        <IonFooter>
          <IonButton
            color="danger"
            expand="block"
            type="submit"
            onClick={handleReject}
          >
            {loading ? <IonSpinner /> : 'Reject Post'}
          </IonButton>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default RejectPostModal;
