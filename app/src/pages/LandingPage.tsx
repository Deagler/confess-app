import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_BY_ID, GET_COMMUNITY_POSTS } from '../common/graphql/posts';
import { chatbox, school, checkmarkCircleSharp, grid } from 'ionicons/icons';
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
  IonCardContent,
  IonLabel,
  IonChip,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonSkeletonText,
  IonSlides,
  IonSlide,
  IonItemGroup,
  IonModal,
} from '@ionic/react';
import './LandingPage.css';
import image from '../theme/IconImage/uoa.svg';
import LandingPost from '../components/LandingPost';

export interface LandingPageProps {
  email: string; // TODO: three input fields, logIn button click event
}
const LandingPage: React.FC = () => {
  const { loading, data, called } = useQuery(GET_COMMUNITY_POSTS, {
    variables: {
      id: 'HW6lY4kJOpqSpL39hbUV',
    },
  });
  const [text, setText] = useState<string>();
  const [secondText, setSecondText] = useState<string>();
  const [thirdText, setThirdText] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const slideOpts = {
    direction: 'horizontal',
    speed: 1000, // 0.3s transition
    autoplay: true,
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonGrid>
          <IonRow className="ion-nowrap ion-align-items-center">
            <IonGrid>
              <IonRow className="ion-nowrap">
                <IonIcon className="ChipIcon" icon={chatbox} size="large" />
                <IonTitle>Confess</IonTitle>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonCol className="ion-align-items-stretch" />
            </IonGrid>
            <IonGrid>
              <IonCol className="GetStartedHeader">
                <IonGrid>
                  <IonRow className="ion-nowrap">
                    <IonInput
                      className="EmailInput"
                      id="InputHeader"
                      inputmode="email"
                      value={text}
                      placeholder="Enter Your University Email"
                      onIonChange={(e) => setText(e.detail.value!)}
                      clearInput={true}
                    />
                    <IonModal isOpen={showModal} swipeToClose={true}>
                      <IonInput />
                      <IonButton onClick={() => setShowModal(false)}>
                        Close Modal
                      </IonButton>
                    </IonModal>
                    <IonButton
                      disabled={text?.trim() === ''}
                      id="ButtonHeader"
                      fill="clear"
                      className="landingButton"
                      onClick={() => setShowModal(true)}
                    >
                      Log In
                    </IonButton>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonGrid>
          </IonRow>
        </IonGrid>
      </IonHeader>

      <IonContent>
        <IonGrid className="ion-margin-vertical ion-justify-content-center">
          <IonRow className="Introduction">
            <IonCol size="12" className="IntroductionCol">
              <IonLabel className="Slogon">
                Confess anonymously to your peers
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
              <IonInput
                required={true}
                inputmode="email"
                value={secondText}
                placeholder="Your vniversity email here"
                onIonChange={(e) => setSecondText(e.detail.value!)}
                clearInput={true}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
              <IonButton
                disabled={secondText?.trim() === ''}
                fill="clear"
                className="landingButton"
              >
                Log In
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
              {' '}
              <IonLabel className="ion-margin-vertical">
                Or check out some confessions as a guest
              </IonLabel>{' '}
            </IonCol>
          </IonRow>

          <IonRow>
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

          <IonRow className="ion-margin-vertical">
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

        <IonGrid size-sm={true}>
          <IonRow>
            <IonCol size="8">
              <IonGrid className="SubIntroduction">
                <IonCardTitle className="ion-margin-vertical">
                  Completely anonymous confessions
                </IonCardTitle>
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
                />
                <IonButton
                  disabled={thirdText?.trim() === ''}
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
            <IonCol size="8">
              <IonTitle className="Description">
                Confess is where you can go for a vent
              </IonTitle>
              {loading ? (
                <IonSlide />
              ) : (
                <IonSlides pager={true} options={slideOpts}>
                  {data.community.feed.map((slide) => (
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
