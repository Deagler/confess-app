import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonTitle,
  IonContent,
  IonToast,
  IonCard,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
} from '@ionic/react';
import './SubmitPage.css';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_POST_FOR_APPROVAL } from '../common/graphql/posts';
import { RouteComponentProps } from 'react-router';
import {
  SubmitPostForApproval,
  SubmitPostForApprovalVariables,
} from '../types/SubmitPostForApproval';
import { appPageCSS } from '../styles/global';
import SubmissionRulesModal from '../components/SubmissionRulesModal';
import { useSelectedCommunity } from '../customHooks/location';
import { firebaseAnalytics } from '../services/firebase';
import { uploadImageToCloudStorage } from '../common/firebase/cloudStorage';
import { GET_COMMUNITY_POSTS } from '../common/graphql/community';
import { buildLink } from '../utils';
import SubmitForm from '../components/SubmitForm';

const SubmitPage: React.FC<RouteComponentProps> = ({ history }) => {
  // TODO: Add form handling, can be done with state or libraries such as Formik
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  const [confessionText, setConfessionText] = useState<string>();
  const [authorAlias, setAuthorAlias] = useState<string>();
  const [successToastVisible, setSuccessToastVisible] = useState<boolean>(
    false
  );
  const [showSubmitModal, setSubmitShowModal] = useState(false);
  const [showInfoOnlyModal, setShowInfoOnlyModal] = useState(false);
  const communityId = useSelectedCommunity();
  const [submitPostForApproval, { loading, error }] = useMutation<
    SubmitPostForApproval,
    SubmitPostForApprovalVariables
  >(SUBMIT_POST_FOR_APPROVAL);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<Error>();

  const handleSubmit = async () => {
    if (!communityId) {
      console.error('failed to submit post: communityId is not set');
      return;
    }

    // TODO: add input validation
    try {
      setUploadError(undefined);
      setUploadLoading(true);
      let uploadKey: string | null = null;
      if (image) {
        uploadKey = await uploadImageToCloudStorage(image);
      }
      setUploadLoading(false);

      await submitPostForApproval({
        variables: {
          communityId,
          channelId: selectedChannel!,
          title: title!,
          content: confessionText!,
          authorAlias: authorAlias || '',
          imageRef: uploadKey,
        },
        refetchQueries: [
          {
            query: GET_COMMUNITY_POSTS,
            variables: {
              channelId: null,
              id: communityId,
              limit: 5,
              sortBy: { property: 'postNumber', direction: 'DESC' },
            },
          },
        ],
        awaitRefetchQueries: true,
      });

      // success
      setConfessionText(undefined);
      setAuthorAlias(undefined);
      setTitle(undefined);
      setSelectedChannel(undefined);
      setImage(undefined);
      setImageURL(undefined);
      // close modal
      setSubmitShowModal(false);

      // show success message
      setSuccessToastVisible(true);
      firebaseAnalytics.logEvent('submit_post', {
        communityId,
        channelId: selectedChannel,
        title,
        content: confessionText,
        authorAlias,
      });

      history.push(buildLink('/posts', communityId));

      return;
    } catch (e) {
      console.error(e);
      setUploadLoading(false);
      setUploadError(e);
      setSubmitShowModal(false);
      firebaseAnalytics.logEvent('exception', {
        description: `submit_page/${e.message}`,
        channelId: selectedChannel,
        communityId,
      });
    }
  };

  return (
    <IonPage {...appPageCSS}>
      <IonToast
        isOpen={successToastVisible}
        message="Post submitted!"
        duration={2000}
        onDidDismiss={() => setSuccessToastVisible(false)}
      />
      <IonToast
        isOpen={!!error || !!uploadError}
        message={error?.message || uploadError?.message}
        duration={2000}
      />
      <SubmissionRulesModal
        isOpen={showSubmitModal}
        onDidDismiss={() => setSubmitShowModal(false)}
        loadingSubmit={loading || uploadLoading}
        onSubmit={handleSubmit}
      />
      <SubmissionRulesModal
        isOpen={showInfoOnlyModal}
        onDidDismiss={() => setShowInfoOnlyModal(false)}
        infoOnly={true}
      />
      <IonHeader className="ion-hide-lg-up">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Cancel" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton
              disabled={!(selectedChannel && title && confessionText)}
              onClick={() => setSubmitShowModal(true)}
            >
              Submit
            </IonButton>
          </IonButtons>
          <IonTitle>Create Confession</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contentContainer">
          <h4 className="ion-hide-lg-down ion-margin-top ion-margin-horizontal">
            <strong>Create a new confession</strong>
          </h4>
          <IonCard className="ion-hide-lg-down">
            <IonCardContent>
              <SubmitForm
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                setTitle={setTitle}
                title={title}
                setImage={setImage}
                image={image}
                imageURL={imageURL}
                setImageURL={setImageURL}
                setConfessionText={setConfessionText}
                confessionText={confessionText}
                authorAlias={authorAlias}
                setAuthorAlias={setAuthorAlias}
                onDisplayRules={() => setShowInfoOnlyModal(true)}
              />
            </IonCardContent>

            <IonFooter>
              <IonGrid>
                <IonRow className="ion-justify-content-center">
                  <IonCol>
                    <IonButton
                      onClick={() => {
                        history.push(buildLink('/posts', communityId));
                      }}
                      color="danger"
                      expand="block"
                    >
                      Cancel
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      disabled={!(selectedChannel && title && confessionText)}
                      onClick={() => setSubmitShowModal(true)}
                      color="primary"
                      expand="block"
                    >
                      Submit
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonFooter>
          </IonCard>
          <div className="ion-hide-lg-up">
            <SubmitForm
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              setTitle={setTitle}
              title={title}
              setImage={setImage}
              image={image}
              imageURL={imageURL}
              setImageURL={setImageURL}
              setConfessionText={setConfessionText}
              confessionText={confessionText}
              authorAlias={authorAlias}
              setAuthorAlias={setAuthorAlias}
              onDisplayRules={() => setShowInfoOnlyModal(true)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SubmitPage;
