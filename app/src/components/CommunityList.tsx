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
import { useHistory } from 'react-router';

const CommunityList: React.FC<{}> = () => {
  const { data, loading, error } = useQuery<GetCommunities>(GET_COMMUNITIES);
  const history = useHistory();

  const communities = data?.communities?.filter((e) => e?.isEnabled);

  const handleCommunityChange = (newId?: string) => {
    if (newId) {
      localStorage.setItem('selectedCommunityId', newId);
    }
    history.push(buildLink(`/posts`, newId));
  };

  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonList {...backgroundColor}>
        {loading ? (
          <IonSpinner />
        ) : (
          communities &&
          communities.map((community, i) => (
            <IonItem
              button={true}
              key={i}
              {...backgroundColor}
              onClick={() => handleCommunityChange(community?.id)}
            >
              <IonAvatar slot="start">
                <img src={community?.imageURI} alt={community?.name} />
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
