import React from 'react';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { school } from 'ionicons/icons';
import { backgroundColor } from '../theme/global';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { GetCommunities } from '../types/GetCommunities';
import { useQuery } from '@apollo/react-hooks';
import { buildLink } from '../utils';

const CommunityList: React.FC<{}> = () => {
  const { data, loading, error } = useQuery<GetCommunities>(GET_COMMUNITIES);

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonList {...backgroundColor}>
        {loading ? (
          <IonSpinner />
        ) : (
          data &&
          data.communities.map((community, i) => (
            <IonItem
              key={i}
              {...backgroundColor}
              routerLink={buildLink(`/posts`, community?.id)}
            >
              <IonAvatar slot="start">
                <img src={community?.imageURI} />
              </IonAvatar>
              <IonLabel>{community?.name}</IonLabel>
            </IonItem>
          ))
        )}
        <IonItem {...backgroundColor}>
          <IonAvatar slot="start">
            <img alt="Other" src={school} />
          </IonAvatar>
          <IonLabel>More universities coming soon.</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default CommunityList;
