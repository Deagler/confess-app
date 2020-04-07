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
import { LoginInput } from '../components/LoginInput';
import { css } from 'glamor';
import { offWhiteCSS } from '../theme/global';

const containerClass = css(
  {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
  },
  offWhiteCSS
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

  console.log(data);

  return (
    <IonPage id="landing-page">
      <IonContent {...offWhiteCSS}>
        <div {...containerClass} className=" ion-align-self-center">
          <IonToolbar>
            <IonItem {...offWhiteCSS} slot="start" lines="none">
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
                <IonList {...offWhiteCSS}>
                  <IonItem {...offWhiteCSS}>
                    <IonAvatar slot="start">
                      <img alt="UoA" src={uoa} />
                    </IonAvatar>
                    <IonLabel>The University of Auckland</IonLabel>
                  </IonItem>
                  <IonItem {...offWhiteCSS}>
                    <IonAvatar slot="start">
                      <img alt="Other" src={school} />
                    </IonAvatar>
                    <IonLabel>More universities coming soon.</IonLabel>
                  </IonItem>
                </IonList>
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

          <IonItemDivider {...offWhiteCSS} />
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
                      {data?.community?.feed &&
                        data.community.feed.items.slice(0, 4).map((slide) => (
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
