import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_BY_ID, GET_COMMUNITY_POSTS } from '../common/graphql/posts';
import {
  chatbox,
  school,
  checkbox,
  person,
  chatboxEllipsesOutline,
} from 'ionicons/icons';
import {
  IonPage,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonInput,
  IonContent,
  IonTitle,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonText,
  IonCardContent,
  IonCard,
  IonLabel,
  IonChip,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonCardHeader,
  IonSkeletonText,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonSlides,
  IonSlide,
} from '@ionic/react';
import './LandingPage.css';
import Post, { PostProps, PostData } from '../components/Post';
export interface LandingPageData {
  email: string;
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
  const slideOpts = {
    initialSlide: 0,
    direction: 'horizontal', // or vertical
    // speed: 000, //0.3s transition
    autoplay: 300,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonGrid className="ConfessHeader">
          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonIcon icon={chatbox} />
                <IonTitle>Confess</IonTitle>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem lines="none">
                <IonInput
                  inputmode="email"
                  value={text}
                  placeholder="Enter Your University Email"
                  onIonChange={(e) => setText(e.detail.value!)}
                  clearInput={true}
                />
                <IonButton className="ion-margin-end">Get Started</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>

      <IonContent>
        <IonGrid className="ion-margin-vertical">
          <IonRow className="Introduction">
            <IonCol size="12">
              <IonTitle>Confess Title</IonTitle>
              <IonInput
                className="ion-margin-vertical"
                inputmode="email"
                value={secondText}
                placeholder="Your vniversity email here"
                onIonChange={(e) => setSecondText(e.detail.value!)}
                clearInput={true}
              />
              <IonButton>Get Started</IonButton>
              <IonRow>
                {' '}
                <IonLabel className="ion-margin-vertical">
                  Or check out some confessions as a guest
                </IonLabel>{' '}
              </IonRow>
              <IonRow>
                <IonCard>
                  <IonCardContent>
                    <IonIcon icon={school} className="ion-margin-end" />
                    <IonText>University of Auckland</IonText>
                  </IonCardContent>
                </IonCard>
              </IonRow>
              <IonRow>
                <IonCard>
                  <IonCardContent>
                    <IonText>More universities comming soon</IonText>
                  </IonCardContent>
                </IonCard>
              </IonRow>
              <IonRow className="ion-margin-vertical">
                <IonChip>
                  <IonIcon icon={checkbox} />
                  <IonLabel>Confessions</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={checkbox} />
                  <IonLabel>Memes</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={checkbox} />
                  <IonLabel>Emotions</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={checkbox} />
                  <IonLabel>All In One Place</IonLabel>
                </IonChip>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="6">
              <IonCard className="ion-justify-content-center">
                <IonCardContent className="SubIntroduction">
                  <IonCardTitle className="ion-margin-vertical">
                    Completely anonymous confessions
                  </IonCardTitle>
                  <IonCardSubtitle>
                    We care about your privacy. Share your feelings and your
                    memes with your peers safely and anonymously
                  </IonCardSubtitle>
                  <IonInput
                    className="ion-margin-vertical"
                    inputmode="email"
                    value={thirdText}
                    placeholder="Your vniversity email here"
                    onIonChange={(e) => setThirdText(e.detail.value!)}
                    clearInput={true}
                  />
                  <IonButton className="ion-margin-bottom">
                    Get Started
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard>
                <IonSlides options={slideOpts} pager={true}>
                  <IonSlide>
                    <IonCardHeader>
                      <IonCardSubtitle>{'id'}</IonCardSubtitle>
                      <IonCardTitle>{'title'}</IonCardTitle>
                      <IonCardSubtitle>{'date'}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{'content'}</IonCardContent>
                    <IonCardContent>{'Anonymous'}</IonCardContent>
                  </IonSlide>
                  <IonSlide>
                    <IonCardHeader>
                      <IonCardSubtitle>{'id'}</IonCardSubtitle>
                      <IonCardTitle>{'title'}</IonCardTitle>
                      <IonCardSubtitle>{'date'}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{'content'}</IonCardContent>
                    <IonCardContent>{'Anonymous'}</IonCardContent>
                  </IonSlide>
                </IonSlides>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
