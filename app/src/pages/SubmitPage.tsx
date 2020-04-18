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
  IonList,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonToast,
  IonSpinner,
  IonCard,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonIcon,
  IonImg,
} from '@ionic/react';
import './SubmitPage.css';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_POST_FOR_APPROVAL } from '../common/graphql/posts';
import { RouteComponentProps } from 'react-router';
import {
  SubmitPostForApproval,
  SubmitPostForApprovalVariables,
} from '../types/SubmitPostForApproval';
import { appPageCSS } from '../theme/global';
import SubmissionRulesModal from '../components/SubmissionRulesModal';
import { informationCircleOutline } from 'ionicons/icons';
import { useSelectedCommunityQuery } from '../customHooks/community';
import { useSelectedCommunity } from '../customHooks/location';
import { firebaseAnalytics } from '../services/firebase';
import { storage } from '../services/firebase';
const channelInterfaceOptions = {
  header: 'Channel',
  subHeader: 'Select the channel',
  message: 'The post will be found in the selected channel',
};

interface SubmitFormProps {
  selectedChannel?: string;
  setSelectedChannel(channel?: string): void;
  title?: string;
  setTitle(title?: string): void;
  image?: File;
  setImage(image?: File): void;
  confessionText?: string;
  setConfessionText(text?: string): void;
  authorAlias?: string;
  setAuthorAlias(alias?: string): void;
  onDisplayRules(): void;
  imageUrl?: string;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  setSelectedChannel,
  setTitle,
  title,
  setImage,
  image,
  imageUrl,
  setConfessionText,
  confessionText,
  authorAlias,
  setAuthorAlias,
  onDisplayRules,
}) => {
  const { data, loading, error } = useSelectedCommunityQuery();
  const channels = data?.community?.channels && data.community!.channels;
  const imageUploadHandler = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
    imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Channel</IonLabel>
          <IonSelect
            interfaceOptions={channelInterfaceOptions}
            interface="popover"
            multiple={false}
            onIonChange={(e) => setSelectedChannel(e.detail.value)}
          >
            {loading ? (
              <IonSpinner />
            ) : (
              channels &&
              channels.map((channel, index) => (
                <IonSelectOption key={index} value={channel?.id}>
                  {channel?.name}
                </IonSelectOption>
              ))
            )}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput
            clearInput={true}
            inputMode="text"
            maxlength={255}
            minlength={2}
            placeholder="Enter confession title"
            required={true}
            onIonChange={(e) => setTitle(e.detail.value!)}
            value={title}
            spellCheck={true}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Image</IonLabel>
          <input
            id="img"
            type="file"
            onChange={imageUploadHandler}
            accept="image/*"
          />
          {imageUrl && (
            <IonImg
              style={{ width: '300px', height: '300px' }}
              src={imageUrl}
            />
          )}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Your Confession</IonLabel>
          <IonTextarea
            rows={10}
            required={true}
            placeholder="Enter your confession. Make sure to follow the rules, all posts are moderated before they can be seen. "
            onIonChange={(e) => setConfessionText(e.detail.value!)}
            value={confessionText}
            spellCheck={true}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Author (Optional)</IonLabel>
          <IonInput
            clearInput={true}
            inputMode="text"
            maxlength={255}
            minlength={2}
            placeholder="e.g. 'Depressed engineer' or 'Lonely arts student'"
            onIonChange={(e) => setAuthorAlias(e.detail.value!)}
            value={authorAlias}
          />
        </IonItem>
        <IonItem lines="none" className="ion-no-padding">
          <IonButton fill="clear" slot="start" onClick={() => onDisplayRules()}>
            Submission rules
            <IonIcon slot="end" icon={informationCircleOutline} />
          </IonButton>
        </IonItem>
      </IonList>
    </>
  );
};

const SubmitPage: React.FC<RouteComponentProps> = ({ history }) => {
  // TODO: Add form handling, can be done with state or libraries such as Formik
  // the apollo hook useMutation could be used to make the request
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
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

  const handleSubmit = async (
    channelId: string,
    postTitle: string,
    _image: File,
    content: string,
    authorAliasInput?: string
  ) => {
    if (!communityId) {
      console.error('failed to submit post: communityId is not set');
      return;
    }

    // TODO: add input validation
    try {
      await submitPostForApproval({
        variables: {
          communityId,
          channelId,
          title: postTitle,
          content,
          authorAlias: authorAliasInput || '',
        },
      });
      // TODO: Upload image to firestore
      if (_image.name !== '') {
        const uploadTask = storage.ref(`/images/${_image.name}`).put(_image);
        uploadTask.on(
          'state_changed',
          (snapShot) => {
            // takes a snap shot of the process as it is happening
            console.log(snapShot);
          },
          (err) => {
            // catches the errors
            console.log(err);
          },
          () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage
              .ref('images')
              .child(_image.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                //  setImageUrl(prevObject => ({...prevObject, imageUrl: fireBaseUrl}))
              });
          }
        );
      }

      // success
      setConfessionText(undefined);
      setAuthorAlias(undefined);
      setTitle(undefined);
      setSelectedChannel(undefined);
      setImage(undefined);
      // close modal
      setSubmitShowModal(false);

      // show success message
      setSuccessToastVisible(true);
      firebaseAnalytics.logEvent('submit_post', {
        communityId,
        channelId,
        title,
        content,
        authorAlias: authorAliasInput || '',
      });
      history.goBack();
      return;
    } catch (e) {
      firebaseAnalytics.logEvent('exception', {
        description: `submit_page/${e.message}`,
        channelId,
        communityId,
      });
    }
  };

  return (
    <IonPage {...appPageCSS}>
      <IonToast
        isOpen={successToastVisible}
        message="Post submitted for approval"
        duration={2000}
        onDidDismiss={() => setSuccessToastVisible(false)}
      />
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <SubmissionRulesModal
        isOpen={showSubmitModal}
        onDidDismiss={() => setSubmitShowModal(false)}
        loadingSubmit={loading}
        onSubmit={() =>
          handleSubmit(
            selectedChannel!,
            title!,
            image!,
            confessionText!,
            authorAlias
          )
        }
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
          <h4 className="ion-hide-lg-down ion-margin-top">
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
                        history.goBack();
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
                      {loading ? <IonSpinner /> : 'Submit'}
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
