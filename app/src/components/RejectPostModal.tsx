import React from 'react';
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
} from '@ionic/react';

export interface RejectPostModalProps {
  isOpen: boolean;
  onDidDismiss(): void;
}

const RejectPostModal: React.FC<RejectPostModalProps> = ({
  isOpen,
  onDidDismiss,
}) => {
  return (
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
              autocorrect="on"
              spellcheck={true}
            />
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton color="danger" expand="block" type="submit">
          Reject Post
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default RejectPostModal;
