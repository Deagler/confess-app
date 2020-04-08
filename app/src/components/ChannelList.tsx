import React from 'react';
import {
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonIcon,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';
import { useQuery } from '@apollo/react-hooks';
import { GetSelectedCommunity } from '../types/GetSelectedCommunity';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';
import {
  useSelectedChannel,
  useSelectedCommunity,
} from '../customHooks/location';
import { buildLink } from '../utils';

const ChannelList: React.FC<{}> = () => {
  const { data, loading, error } = useQuery<GetSelectedCommunity>(
    GET_SELECTED_COMMUNITY
  );

  const channelId = useSelectedChannel();
  const communityId = useSelectedCommunity();

  // NOTE: intentionally using href over routerLink in the IonItem components below.
  // It is a workaround for the infinite loading of useQuery when navigating to
  // a channel.
  return (
    <>
      <IonToast isOpen={!!error} message={error?.message} duration={2000} />
      <IonList>
        {loading ? (
          <IonSpinner />
        ) : (
          <>
            <IonMenuToggle autoHide={false}>
              <IonItem
                className={!channelId ? 'selected' : ''}
                href={buildLink('/page/posts', communityId)}
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={airplaneOutline} />
                <IonLabel>All</IonLabel>
              </IonItem>
            </IonMenuToggle>

            {!error &&
              data &&
              data.selectedCommunity!.channels.map((channel, index: number) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={channelId === channel?.id ? 'selected' : ''}
                    href={buildLink('/page/posts', communityId, channel?.id)}
                    lines="none"
                    detail={false}
                  >
                    <IonIcon slot="start" icon={airplaneOutline} />
                    <IonLabel>{channel?.name}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}
          </>
        )}
      </IonList>
    </>
  );
};

export default ChannelList;
