import React, { useState } from 'react';
import { useSelectedCommunityQuery } from '../customHooks/community';
import { css } from 'glamor';
import {
  IonToast,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSpinner,
  IonSelectOption,
  IonInput,
  IonRow,
  IonTextarea,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

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
  imageURL?: string;
  setImageURL(url?: string): void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  setSelectedChannel,
  setTitle,
  title,
  setImage,
  setConfessionText,
  confessionText,
  authorAlias,
  setAuthorAlias,
  onDisplayRules,
  imageURL,
  setImageURL,
}) => {
  const { data, loading, error } = useSelectedCommunityQuery();
  const channels = data?.community?.channels && data.community!.channels;
  const [alertMessage, setAlertMessage] = useState<string>();

  const imageUploadHandler = (event: any) => {
    const file: File = event.target.files[0];

    if (!file) {
      setAlertMessage('No file selected, please try again.');
      return;
    }

    // check file size
    if (file.size < 5242880) {
      setImage(file);
      const url: string = URL.createObjectURL(file);
      setImageURL(url);
    } else {
      setAlertMessage(
        'Image exceeds maximum file size of 5 MB. Please try again with a smaller image.'
      );
    }
  };

  const closeButton = css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'var(--ion-color-danger)',
    fontSize: '40px',
    fontWeight: 'bold',
    transition: '0.3s',
    ':hover': {
      color: 'var(--ion-color-danger-tint)',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  });

  const imagePreview = css({
    animationName: 'zoom',
    animationDuration: '0.6s',
    paddingBottom: '20px',
    margin: 'auto',
  });

  return (
    <>
      <IonToast
        isOpen={!!alertMessage}
        message={alertMessage}
        duration={2000}
        onDidDismiss={() => setAlertMessage(undefined)}
      />
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
          <IonRow>
            <IonLabel position="stacked">Image (optional)</IonLabel>
          </IonRow>
          <IonRow>
            <div className="upload-btn-wrapper">
              <button className="btn">Upload a file</button>
              <input
                type="file"
                name="myfile"
                onChange={imageUploadHandler}
                accept="image/*"
              />
            </div>
          </IonRow>
          <IonRow className="ion-align-self-center">
            {imageURL && (
              <div>
                <span
                  {...closeButton}
                  onClick={() => {
                    setImage(undefined);
                    setImageURL(undefined);
                  }}
                >
                  &times;
                </span>
                <img {...imagePreview} src={imageURL} alt="upload preview" />
              </div>
            )}
          </IonRow>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Your Confession</IonLabel>
          <IonTextarea
            rows={10}
            required={true}
            placeholder="Enter your confession. Make sure to follow the rules, your confession will show up instantly. "
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

export default SubmitForm;
