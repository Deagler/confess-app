import React, { useState, useEffect } from 'react';
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
import { useSelectedCommunity } from '../customHooks/location';
import { firebaseAnalytics } from '../services/firebase';
import { getDownloadUrl } from '../common/firebase/cloudStorage';
import { css } from 'glamor';

const imageContainer = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const image = css({
  margin: 'auto',
});

export interface PostRequestProps {
  id: string;
  title: string;
  creationTimestamp: number;
  content: string;
  authorAlias: string | null;
  imageRef?: string | null;
  onModeration(): void;
}

const PostRequest: React.FC<PostRequestProps> = (props: PostRequestProps) => {
  const {
    id,
    title,
    creationTimestamp,
    content,
    authorAlias,
    imageRef,
    onModeration,
  } = props;
  const communityId = useSelectedCommunity();
  const [approvePost, { loading, error }] = useMutation<
    ApprovePost,
    ApprovePostVariables
  >(APPROVE_POST);

  const [imageURL, setImageURL] = useState<string>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  useEffect(() => {
    if (imageRef) {
      setImageLoading(true);
      getDownloadUrl(imageRef)
        .then((url) => setImageURL(url))
        .then(() => setImageLoading(false))
        .catch((e) => {
          console.error(e);
          setImageLoading(false);
        });
    }
  }, [imageRef]);

  const approveHandler = async () => {
    try {
      await approvePost({
        variables: {
          postId: id,
          communityId: communityId!,
        },
      });

      firebaseAnalytics.logEvent('post_approved', {
        communityId,
        postId: id,
      });
      // callback
      onModeration();
    } catch (e) {
      console.error(e);
      firebaseAnalytics.logEvent('exception', {
        description: `post_request_approve/${e.message}`,
      });
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
          <IonCardSubtitle>{`Post ID: ${id}`}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            {moment.unix(creationTimestamp).fromNow()}
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <div {...imageContainer}>
            {imageLoading && <IonSpinner />}
            {imageURL && <img src={imageURL} alt="post content" {...image} />}
          </div>
          <p>{content}</p>
        </IonCardContent>
        <IonCardContent>~ {authorAlias || 'Anonymous'}</IonCardContent>

        <IonItemDivider color="white" />

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
