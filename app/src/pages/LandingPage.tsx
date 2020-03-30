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
} from '@ionic/react';
import Post, { PostProps, PostData } from '../components/Post';
const LandingPage: React.FC = (hi) => {
  const [selected, setSelected] = useState<string>('1');
  const { loading, data, called } = useQuery(GET_COMMUNITY_POSTS, {
    variables: {
      id: 'HW6lY4kJOpqSpL39hbUV',
    },
  });

  const [text, setText] = useState<string>();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="">
          <IonRow>
            <IonItem>
              <IonIcon icon={chatbox} />
              <IonTitle>Confess</IonTitle>
            </IonItem>
            <IonCol className="ion-margin-start" />
            <IonInput
              value={text}
              placeholder="Enter Your University Email"
              onIonChange={(e) => setText(e.detail.value!)}
              clearInput={true}
            />
            <IonButton>Get Started</IonButton>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonTitle>Confess Title</IonTitle>
            <IonInput
              value={text}
              placeholder="Your vniversity email here"
              onIonChange={(e) => setText(e.detail.value!)}
              clearInput={true}
            />
            <IonButton>Get Started</IonButton>
            <IonRow>
              {' '}
              <IonText>Or check out some confessions as a guest</IonText>{' '}
            </IonRow>
            <IonRow>
              <IonCard>
                <IonCardContent>
                  <IonIcon icon={school} />
                  <IonText>University of Auckland</IonText>
                </IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCard>
                <IonCardContent>
                  <IonIcon icon={school} />
                  <IonText>More universities comming soon ..</IonText>
                </IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonChip>
                <IonIcon icon={checkbox} />
                <IonLabel>Default</IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={checkbox} />
                <IonLabel>Default</IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={checkbox} />
                <IonLabel>Default</IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={checkbox} />
                <IonLabel>Default</IonLabel>
              </IonChip>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow className="Description">
          <IonCol>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Completely anonymous confessions</IonCardTitle>
                <IonCardSubtitle>
                  We care about your privacy. Share your feelings and your memes
                  with your peers safely and anonymously
                </IonCardSubtitle>
                <IonInput
                  value={text}
                  placeholder="Your vniversity email here"
                  onIonChange={(e) => setText(e.detail.value!)}
                  clearInput={true}
                />
                <IonButton>Get Started</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                {' '}
                <IonIcon icon={chatboxEllipsesOutline} />{' '}
              </IonCardHeader>
              <IonContent>
                {loading ? (
                  <IonCard>
                    <IonSkeletonText
                      animated={true}
                      style={{ height: '200px' }}
                    />
                  </IonCard>
                ) : (
                  <IonCard>
                    <IonCardHeader />
                  </IonCard>
                )}
              </IonContent>
              <IonList>
                <IonRadioGroup
                  className="RadioGroup"
                  value={selected}
                  onIonChange={(e) => setSelected(e.detail.value)}
                >
                  <IonItem>
                    <IonRadio value="1" />

                    <IonRadio value="2" />
                    <IonRadio value="3" />
                    <IonRadio value="4" />
                    <IonRadio value="5" />
                  </IonItem>
                </IonRadioGroup>
              </IonList>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
