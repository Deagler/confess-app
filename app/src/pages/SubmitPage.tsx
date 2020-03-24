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

const channelInterfaceOptions = {
  header: 'Channel',
  subHeader: 'Select the channel',
  message: 'Only users in the selected channel will see the post',
};

const topicInterfaceOptions = {
  header: 'Topic',
  subHeader: 'Select the topic',
};

// TODO: Replace with apollo hooks useQuery once back-end is setup
const channels = ['Engineering', 'Commerce', 'Science', 'Law', 'Arts'];
const topics = [
  'Coronavirus at university',
  'Working from home',
  'Self-isolation zoom parties',
  'Depression',
  'Idiots in lectures',
  'Lecturers',
  'Engineering Careers',
  'Commerce Careers',
  'Science Careers',
  'Law Careers',
  'McDonalds Careers',
];

const SubmitPage: React.FC<{}> = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [confessionText, setConfessionText] = useState<string>();
  const [author, setAuthor] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/feed" text="Cancel" />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton disabled={true}>Post</IonButton>
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
            <IonLabel style={selectedTopic ? {} : { color: 'lightgrey' }}>
              {selectedTopic || 'Choose a topic'}
            </IonLabel>
            <IonSelect
              selectedText={' '}
              interfaceOptions={topicInterfaceOptions}
              interface="popover"
              multiple={false}
              onIonChange={(e) => setSelectedTopic(e.detail.value)}
              value={selectedTopic}
            >
              {topics.map((topic, index) => (
                <IonSelectOption key={index}>{topic}</IonSelectOption>
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
            <IonLabel position="stacked">Author Name</IonLabel>
            <IonInput
              clearInput={true}
              inputMode="text"
              maxlength={255}
              minlength={2}
              placeholder="e.g. 'anonymous' or your name"
              required={true}
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
