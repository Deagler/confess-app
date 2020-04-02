import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMUNITY_POSTS } from '../common/graphql/posts';
import { chatbox, school, checkmarkCircleSharp } from 'ionicons/icons';
import {
  IonPage,
  IonIcon,
  IonHeader,
  IonInput,
  IonContent,
  IonTitle,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonChip,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonSlides,
  IonSlide,
  IonItemGroup,
  IonModal,
  IonSpinner,
} from '@ionic/react';
import './LandingPage.css';
import image from '../theme/IconImage/uoa.svg';
import LandingPost from '../components/LandingPost';

export interface LandingPageProps {
  email: string; // TODO: three input fields, logIn button click event
}
const LandingPage: React.FC = () => {
  const { loading, data } = useQuery(GET_COMMUNITY_POSTS, {
    variables: {
      id: 'HW6lY4kJOpqSpL39hbUV',
    },
  });
  const [secondText, setSecondText] = useState<string>();
  const [thirdText, setThirdText] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const slideOpts = {
    direction: 'horizontal',
    autoplay: true,
  };
  const [showModal, setShowModal] = useState(false);

  function handleInput(text: any) {
    return text?.trim() === '' ? setIsDisabled(true) : setIsDisabled(false);
  }
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonGrid>
          <IonRow className="ion-nowrap">
            <IonTitle>
              <IonIcon className="ChipIcon" icon={chatbox} />
              Confess
            </IonTitle>
            <IonCol size="auto" />
            <IonModal isOpen={showModal} swipeToClose={true}>
              <IonInput />
              <IonButton onClick={() => setShowModal(false)}>
                Close Modal
              </IonButton>
            </IonModal>
            <IonCol size="0" size-xs="0" size-md="2">
              <IonButton
                id="ButtonHeader"
                fill="clear"
                className="landingButton"
                onClick={() => setShowModal(true)}
              >
                Log In
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-margin-vertical ion-text-center">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="IntroductionCol">
              <IonLabel className="Slogon">
                Confess anonymously to your peers
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="5" size-xs="12" size-md="4" className="MainInput">
              <IonInput
                className="ion-margin-vertical"
                required={true}
                inputmode="email"
                value={secondText}
                placeholder="Your university email here"
                onIonChange={(e) => setSecondText(e.detail.value!)}
                clearInput={true}
                onFocus={() => handleInput(secondText)}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size-xs="12" size-sm="6" size-md="4">
              <IonButton
                disabled={isDisabled}
                fill="clear"
                className="landingButton"
              >
                Log In
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
              <IonLabel className="ion-margin-vertical">
                Or check out some confessions as a guest
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
              <IonItemGroup>
                <IonItem lines="none" className="UniversityList">
                  <IonIcon slot="start" src={image} />
                  <IonLabel>University of Auckland</IonLabel>
                </IonItem>
                <IonItem lines="none" className="UniversityList">
                  <IonIcon slot="start" icon={school} />
                  <IonLabel>More universities coming soon</IonLabel>
                </IonItem>
              </IonItemGroup>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-justify-content-center">
            <IonChip className="Chip">
              <IonIcon className="ChipIcon" icon={checkmarkCircleSharp} />
              <IonLabel>Confessions</IonLabel>
            </IonChip>
            <IonChip className="Chip">
              <IonIcon className="ChipIcon" icon={checkmarkCircleSharp} />
              <IonLabel>Memes</IonLabel>
            </IonChip>
            <IonChip className="Chip">
              <IonIcon className="ChipIcon" icon={checkmarkCircleSharp} />
              <IonLabel>Emotions</IonLabel>
            </IonChip>
            <IonChip className="Chip">
              <IonLabel>All in one place</IonLabel>
            </IonChip>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol size-xs="0" size-sm="0" size-md="1" />
            <IonCol size="8" size-xs="12" size-sm="12" size-md="7">
              <IonGrid className="SubIntroduction">
                <IonCardTitle>Completely anonymous confessions</IonCardTitle>
                <IonCardSubtitle style={{ fontSize: '15px' }}>
                  We care about your privacy. Share your feelings and your memes
                  with your peers safely and anonymously
                </IonCardSubtitle>
                <IonInput
                  style={{}}
                  className="ion-margin-vertical"
                  inputmode="email"
                  value={thirdText}
                  placeholder="Your vniversity email here"
                  onIonChange={(e) => setThirdText(e.detail.value!)}
                  clearInput={true}
                  onFocus={() => handleInput(thirdText)}
                />
                <IonButton
                  disabled={isDisabled}
                  fill="clear"
                  className="landingButton"
                >
                  Log In
                </IonButton>
              </IonGrid>
            </IonCol>
          </IonRow>
          <IonRow
            style={{ height: '300px' }}
            className="ion-margin-horizontal ion-text-nowrap"
          >
            <IonCol
              size="12"
              size-xs="12"
              size-sm="6"
              size-md="12"
              className="ion-margin-top"
            >
              {loading ? (
                <IonSlide>
                  <IonSpinner />
                </IonSlide>
              ) : (
                <IonSlides
                  className="ion-padding-horizontal"
                  pager={true}
                  options={slideOpts}
                >
                  {data.community.feed.slice(0, 4).map((slide) => (
                    <IonSlide key={slide.id} className="ion-text-left">
                      <LandingPost {...slide} />
                    </IonSlide>
                  ))}
                </IonSlides>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
