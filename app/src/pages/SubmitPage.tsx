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
} from '@ionic/react';
import React, { useState } from 'react';
import './SubmitPage.css';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_POST_FOR_APPROVAL } from '../common/graphql/posts';
import { GlobalAppUtils } from '../App';
import { RouteComponentProps } from 'react-router';

const channelInterfaceOptions = {
  header: 'Channel',
  subHeader: 'Select the channel',
  message: 'The post will be found in the selected channel',
};

// TODO: Replace with apollo hooks useQuery once back-end is setup
const channels = [
  'Engineering',
  'Commerce',
  'Science',
  'Law',
  'Arts',
  'Very long name to demonstrate that text wrapping is working',
];

const SubmitPage: React.FC<RouteComponentProps> = ({ history }) => {
  // TODO: Add form handling, can be done with state or libraries such as Formik
  // the apollo hook useMutation could be used to make the request
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [confessionText, setConfessionText] = useState<string>();
  const [author, setAuthor] = useState<string>();

  const [submitPostForApproval] = useMutation(SUBMIT_POST_FOR_APPROVAL);

  const handleSubmit = async (channel, postTitle, content, authorName) => {
    GlobalAppUtils.showLoading();
    const { data } = await submitPostForApproval({
      variables: {
        communityId: 'HW6lY4kJOpqSpL39hbUV',
        channel,
        title: postTitle,
        content,
        authorName,
      },
    });
    GlobalAppUtils.hideLoading();

    if (!data.submitPostForApproval.success) {
      console.error(data);
      GlobalAppUtils.showToast(
        'Failed to create post. Our team has been notified.'
      );
      history.replace(`/page/posts`);
      return;
    }
    console.log(data);

    GlobalAppUtils.showToast(data.submitPostForApproval.message);
    setConfessionText(undefined);
    setAuthor(undefined);
    setTitle(undefined);
    setSelectedChannel(undefined);

    history.replace(`/page/posts`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/posts" text="Cancel" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton
              disabled={!(selectedChannel && title && confessionText)}
              onClick={() =>
                handleSubmit(selectedChannel, title, confessionText, author)
              }
            >
              Post
            </IonButton>
          </IonButtons>
          <IonTitle>Create Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
              onIonChange={(e) => setSelectedChannel(e.detail.value)}
              value={selectedChannel}
            >
              {channels.map((channel, index) => (
                <IonSelectOption key={index}>{channel}</IonSelectOption>
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
              onIonChange={(e) => setAuthor(e.detail.value!)}
              value={author}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SubmitPage;
