import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { chatbox, checkmarkCircleSharp } from 'ionicons/icons';
import {
  IonPage,
  IonIcon,
  IonToolbar,
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonChip,
  IonGrid,
  IonSlides,
  IonSlide,
  IonSkeletonText,
  IonItemDivider,
  IonToast,
} from '@ionic/react';

import LandingPost from '../components/LandingPost';
import { LoginInput } from '../components/LoginInput';
import { css } from 'glamor';
import { backgroundColor } from '../theme/global';
import { GET_LANDING_POSTS } from '../common/graphql/landingPosts';
import { GetLandingPosts } from '../types/GetLandingPosts';
import CommunityList from '../components/CommunityList';

const containerClass = css(
  {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
  },
  backgroundColor
);

const chipClass = css({
  backgroundColor: 'transparent',
});

const loginInput = css({
  maxWidth: '300px',
});

const secondaryHero = css({
  display: 'flex',
  maxHeight: '500px',
});

const LandingPage: React.FC = () => {
  const { loading, data, error } = useQuery<GetLandingPosts>(GET_LANDING_POSTS);

  const slideOpts = {
    direction: 'horizontal',
    autoplay: {
      delay: 4000,
    },
  };

  return (
    <IonPage id="landing-page">
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonContent {...backgroundColor}>
        <div {...containerClass} className=" ion-align-self-center">
          <IonToolbar>
            <IonItem {...backgroundColor} slot="start" lines="none">
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
              <IonCol {...loginInput} size="3">
                <LoginInput />
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="6" size-xs="12" size-sm="6" size-md="6">
                <h5>Or check out some confessions as a guest:</h5>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="5" size-xs="12" size-sm="6" size-md="4">
                <CommunityList />
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top ion-justify-content-center">
              <IonChip {...chipClass}>
                <IonIcon color="primary" icon={checkmarkCircleSharp} />
                <IonLabel>Confessions</IonLabel>
              </IonChip>
              <IonChip {...chipClass}>
                <IonIcon color="primary" icon={checkmarkCircleSharp} />
                <IonLabel>Memes</IonLabel>
              </IonChip>
              <IonChip {...chipClass}>
                <IonIcon color="primary" icon={checkmarkCircleSharp} />
                <IonLabel>Emotions</IonLabel>
              </IonChip>
              <IonChip {...chipClass}>
                <IonLabel style={{ fontWeight: 'bold' }}>
                  All in one place.
                </IonLabel>
              </IonChip>
            </IonRow>
          </IonGrid>

          <IonItemDivider {...backgroundColor} />
          <IonGrid className="ion-text-center">
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
                <IonRow className="ion-justify-content-center">
                  <IonCol {...loginInput}>
                    <LoginInput />
                  </IonCol>
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
                      {data?.landingPosts &&
                        data.landingPosts.slice(0, 4).map((slide) => (
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
