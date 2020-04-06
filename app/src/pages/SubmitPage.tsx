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
} from '@ionic/react';
import React, { useState } from 'react';
import './SubmitPage.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SUBMIT_POST_FOR_APPROVAL } from '../common/graphql/posts';
import { RouteComponentProps } from 'react-router';
import {
  SubmitPostForApproval,
  SubmitPostForApprovalVariables,
} from '../types/SubmitPostForApproval';
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import { appPageCSS } from '../theme/global';

const channelInterfaceOptions = {
  header: 'Channel',
  subHeader: 'Select the channel',
  message: 'The post will be found in the selected channel',
};

const SubmitForm: React.FC<{
  selectedChannel;
  setSelectedChannel;
  setTitle;
  title;
  setConfessionText;
  confessionText;
  authorAlias;
  setAuthorAlias;
}> = ({
  selectedChannel,
  setSelectedChannel,
  setTitle,
  title,
  setConfessionText,
  confessionText,
  authorAlias,
  setAuthorAlias,
}) => {
  const { data } = useQuery<GetSelectedCommunity>(GET_SELECTED_COMMUNITY);
  const channels = data && data.selectedCommunity!.channels;

  const handleChannelChange = (e) => {
    const channelId = e.detail.value;

    const channelName = channels?.find((channel) => channel?.id === channelId)
      ?.name;

    setSelectedChannel(channelName);
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel style={selectedChannel ? {} : { color: 'lightgrey' }}>
          {selectedChannel || 'Choose a channel'}
        </IonLabel>
        <IonSelect
          selectedText={' '}
          interfaceOptions={channelInterfaceOptions}
          interface="popover"
          multiple={false}
          onIonChange={handleChannelChange}
        >
          {channels &&
            channels.map((channel, index) => (
              <IonSelectOption key={index} value={channel?.id}>
                {channel?.name}
              </IonSelectOption>
            ))}
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
    </IonList>
  );
};

const SubmitPage: React.FC<RouteComponentProps> = ({ history }) => {
  // TODO: Add form handling, can be done with state or libraries such as Formik
  // the apollo hook useMutation could be used to make the request
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [confessionText, setConfessionText] = useState<string>();
  const [authorAlias, setAuthorAlias] = useState<string>();
  const [successToastVisible, setSuccessToastVisible] = useState<boolean>(
    false
  );

  const { data } = useQuery<GetSelectedCommunity>(GET_SELECTED_COMMUNITY);

  const [submitPostForApproval, { loading, error }] = useMutation<
    SubmitPostForApproval,
    SubmitPostForApprovalVariables
  >(SUBMIT_POST_FOR_APPROVAL);

  const handleSubmit = async (
    channel: string,
    postTitle: string,
    content: string,
    authorAliasInput?: string
  ) => {
    const communityId = data?.selectedCommunity?.id;
    if (!communityId) {
      console.error('failed to submit post: communityId is not set');
      return;
    }

    // TODO: add input validation
    try {
      await submitPostForApproval({
        variables: {
          communityId,
          channel,
          title: postTitle,
          content,
          authorAlias: authorAliasInput || '',
        },
      });

      // success
      setConfessionText(undefined);
      setAuthorAlias(undefined);
      setTitle(undefined);
      setSelectedChannel(undefined);

      // show success message
      setSuccessToastVisible(true);

      history.goBack();
      return;
    } catch (error) {
      console.error(error);
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
      <IonHeader className="ion-hide-lg-up">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/posts" text="Cancel" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton
              disabled={!(selectedChannel && title && confessionText)}
              onClick={() =>
                handleSubmit(
                  selectedChannel!,
                  title!,
                  confessionText!,
                  authorAlias
                )
              }
            >
              {loading ? <IonSpinner /> : 'Post'}
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
                setConfessionText={setConfessionText}
                confessionText={confessionText}
                authorAlias={authorAlias}
                setAuthorAlias={setAuthorAlias}
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
                      onClick={() =>
                        handleSubmit(
                          selectedChannel!,
                          title!,
                          confessionText!,
                          authorAlias
                        )
                      }
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
              setConfessionText={setConfessionText}
              confessionText={confessionText}
              authorAlias={authorAlias}
              setAuthorAlias={setAuthorAlias}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SubmitPage;
