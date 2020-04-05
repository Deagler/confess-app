import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMUNITY_POSTS } from '../common/graphql/community';
import { chatbox, school, checkmarkCircleSharp } from 'ionicons/icons';
import {
  IonPage,
  IonIcon,
  IonToolbar,
  IonList,
  IonContent,
  IonRow,
  IonAvatar,
  IonCol,
  IonItem,
  IonLabel,
  IonChip,
  IonGrid,
  IonSlides,
  IonSlide,
  IonSkeletonText,
  IonItemDivider,
} from '@ionic/react';

import uoa from '../assets/uoa.svg';
import LandingPost from '../components/LandingPost';

import './LandingPage.css';
import { LoginInput } from '../components/LoginInput';
import { css } from 'glamor';

const secondaryHero = css({
  display: 'flex',
  maxHeight: '500px',
});

const LandingPage: React.FC = () => {
  const { loading, data } = useQuery(GET_COMMUNITY_POSTS, {
    variables: {
      id: 'HW6lY4kJOpqSpL39hbUV',
    },
  });

  const slideOpts = {
    direction: 'horizontal',
    autoplay: {
      delay: 4000,
    },
  };

  return (
    <IonPage id="landing-page">
      <IonContent>
        <div className="container ion-align-self-center">
          <IonToolbar>
            <IonItem slot="start" lines="none">
              <IonIcon icon={chatbox} color="primary" size="large" />
              <IonLabel style={{ fontSize: '24px' }}>Confess</IonLabel>
            </IonItem>
          </IonToolbar>

          <IonGrid className="ion-margin-vertical ion-text-center">
            <IonRow className="ion-justify-content-center">
              <IonCol size="12">
                <h1>Confess anonymously to your peers.</h1>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="5" size-xs="12" size-md="4">
                <LoginInput />
              </IonCol>
            </IonRow>

            {/* <IonRow className="ion-justify-content-center">
              <IonCol size-xs="12" size-sm="6" size-md="4">
                <IonButton fill="clear">Log In</IonButton>
              </IonCol>
            </IonRow> */}

            <IonRow className="ion-justify-content-center">
              <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
                <p>Or check out some confessions as a guest.</p>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
                <IonList>
                  <IonItem>
                    <IonAvatar slot="start">
                      <img alt="UoA" src={uoa} />
                    </IonAvatar>
                    <IonLabel>The University of Auckland</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <img alt="Other" src={school} />
                    </IonAvatar>
                    <IonLabel>More universities coming soon.</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top ion-justify-content-center">
              <IonChip>
                <IonIcon icon={checkmarkCircleSharp} />
                <IonLabel>Confessions</IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={checkmarkCircleSharp} />
                <IonLabel>Memes</IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={checkmarkCircleSharp} />
                <IonLabel>Emotions</IonLabel>
              </IonChip>
              <IonChip>
                <IonLabel style={{ fontWeight: 'bold' }}>
                  All in one place.
                </IonLabel>
              </IonChip>
            </IonRow>
          </IonGrid>

          <IonItemDivider />
          <IonGrid>
            <IonRow {...secondaryHero}>
              <IonCol size-md="4" size-sm="12">
                <IonRow>
                  <IonCol>
                    <h2>Completely anonymous.</h2>
                    <p>
                      We care about your privacy. Share your feelings and memes
                      with your peers safely and anonymously.
                    </p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <LoginInput />
                </IonRow>
              </IonCol>
              <IonCol size-md="8" size-sm="12">
                <IonRow>
                  <IonCol>
                    <h2>Fresh confessions.</h2>
                    <p>Curated each day just for you.</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  {loading ? (
                    <IonSkeletonText
                      animated={true}
                      style={{ height: '450px' }}
                    />
                  ) : (
                    <IonSlides pager={true} options={slideOpts}>
                      {data &&
                        data.community.feed.slice(0, 4).map((slide) => (
                          <IonSlide key={slide.id} className="ion-text-left">
                            <LandingPost {...slide} />
                          </IonSlide>
                        ))}
                    </IonSlides>
                  )}
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
