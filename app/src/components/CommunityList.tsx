import React from 'react';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSpinner,
  IonToast,
  IonCard,
} from '@ionic/react';
import { school, arrowForwardOutline } from 'ionicons/icons';
import { backgroundColor } from '../theme/global';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { GetCommunities } from '../types/GetCommunities';
import { useQuery } from '@apollo/react-hooks';
import { buildLink } from '../utils';
import { useHistory } from 'react-router';
import { css } from 'glamor';

const moreCommunities = css({
  marginInlineStart: '10px',
  marginInlineEnd: '10px',
  borderStyle: 'dashed',
  borderWidth: '2px',
  borderColor: 'lightgrey',
  borderRadius: '7px',
  textAlign: 'center',
});

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
            <IonCard className="ion-margin-bottom" key={i}>
              <IonItem
                lines="none"
                button={true}
                {...backgroundColor}
                onClick={() => handleCommunityChange(community?.id)}
                detail={true}
                detailIcon={arrowForwardOutline}
              >
                <IonAvatar slot="start">
                  <img src={community?.imageURI} alt={community?.name} />
                </IonAvatar>
                <IonLabel className="ion-text-center">
                  {community?.name}
                </IonLabel>
              </IonItem>
            </IonCard>
          ))
        )}
        <IonItem {...backgroundColor} {...moreCommunities} lines="none">
          <IonAvatar slot="start">
            <img style={{ filter: 'opacity(30%)' }} alt="Other" src={school} />
          </IonAvatar>
          <IonLabel style={{ color: '#818181' }}>
            More universities coming soon.
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default CommunityList;
