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
import { useSelectedChannel } from '../customHooks/location';
import { buildLink } from '../utils';
import { useSelectedCommunityQuery } from '../customHooks/community';

const ChannelList: React.FC<{}> = () => {
  const channelId = useSelectedChannel();
  const { data, loading, error, communityId } = useSelectedCommunityQuery();

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
                routerLink={buildLink('/page/posts', communityId)}
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={airplaneOutline} />
                <IonLabel>All</IonLabel>
              </IonItem>
            </IonMenuToggle>

            {data &&
              data.community!.channels.map((channel, index: number) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={channelId === channel?.id ? 'selected' : ''}
                    routerLink={buildLink(
                      '/page/posts',
                      communityId,
                      channel?.id
                    )}
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
