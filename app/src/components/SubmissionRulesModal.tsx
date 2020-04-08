import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonFooter,
  IonSpinner,
} from '@ionic/react';
import React from 'react';
import { css } from 'glamor';

const modalContainer = css({
  flex: 1,
  '& li': {
    marginBottom: '10px',
  },
});

export interface SubmissionRulesModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSubmit?: () => void;
  loadingSubmit?: boolean;
  infoOnly?: boolean;
}

const SubmissionRulesModal: React.FC<SubmissionRulesModalProps> = ({
  isOpen,
  onDidDismiss,
  onSubmit,
  loadingSubmit,
  infoOnly,
}) => (
  <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          {infoOnly ? 'Submission Rules' : 'Submit Confession'}
        </IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onDidDismiss}>
            {infoOnly ? 'Close' : 'Cancel'}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <div {...modalContainer}>
        <h5>Please read the following rules carefully before proceeding.</h5>
        <ol>
          <li>All confessions will be posted anonymously.</li>
          <li>
            Submitted confessions deemed detrimental to the confess community
            will not be posted. Such confessions may include, but are not
            limited to:
          </li>
          <ol type="a">
            <li>Hate speech towards any group or community.</li>
            <li>
              Strong hints of identification towards yourself or any other
              persons.
            </li>
            <li>Suicidal themes.</li>
            <li>
              Legal accusations. Please contact the campus or law authorities
              instead.
            </li>
            <li>Requests for academic advice. This is not Piazza.</li>
            <li>Any form of advertising.</li>
          </ol>
          <li>
            Please make an effort with the spelling and grammar of your
            confessions.
          </li>
          <li>
            The moderation team is not responsible or affiliated with any
            confessions posted.
          </li>
          <li>
            The moderation team is not responsible for the community’s reaction
            to your confessions.
          </li>
        </ol>
      </div>
    </IonContent>
    {!infoOnly && (
      <IonFooter>
        <IonButton expand="block" type="submit" onClick={onSubmit}>
          {loadingSubmit ? <IonSpinner /> : 'Submit Confession'}
        </IonButton>
      </IonFooter>
    )}
  </IonModal>
);

export default SubmissionRulesModal;
