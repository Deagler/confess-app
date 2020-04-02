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

  const slideOpts = {
    direction: 'horizontal',
    autoplay: true,
  };

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
            <IonCol size="0" size-xs="0" size-md="2">
              <IonButton
                id="ButtonHeader"
                fill="clear"
                className="landingButton"
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
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size-xs="12" size-sm="6" size-md="4">
              <IonButton fill="clear" className="landingButton">
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
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="5">
              <IonGrid className="SubIntroduction">
                <IonCardTitle>Completely anonymous confessions</IonCardTitle>
                <IonCardSubtitle style={{ fontSize: '15px' }}>
                  We care about your privacy. Share your feelings and your memes
                  with your peers safely and anonymously
                </IonCardSubtitle>
                <IonInput
                  className="ion-margin-vertical"
                  inputmode="email"
                  value={thirdText}
                  placeholder="Your university email here"
                  onIonChange={(e) => setThirdText(e.detail.value!)}
                  clearInput={true}
                />
                <IonButton fill="clear" className="landingButton">
                  Log In
                </IonButton>
              </IonGrid>
            </IonCol>

            <IonCol size="5">
              {loading ? (
                <IonSpinner />
              ) : (
                <IonSlides pager={true} options={slideOpts}>
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
