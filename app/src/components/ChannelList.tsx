import React from 'react';
import {
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { useSelectedChannel } from '../customHooks/location';
import { buildLink } from '../utils';
import { useSelectedCommunityQuery } from '../customHooks/community';
import { css } from 'glamor';

const icon = css({
  color: 'var(--ion-text-color)',
  fontSize: '24px',
  marginInlineEnd: '16px',
  marginInlineStart: '4px',
});

const ChannelList: React.FC<{}> = () => {
  const channelId = useSelectedChannel();
  const { data, loading, error, communityId } = useSelectedCommunityQuery();

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
                routerLink={buildLink('/posts', communityId)}
                lines="none"
                detail={false}
              >
                <i
                  className="icon ion-md-apps"
                  {...icon}
                  style={{ marginInlineEnd: '22px' }}
                />
                <IonLabel>All</IonLabel>
              </IonItem>
            </IonMenuToggle>

            {data &&
              data.community!.channels.map((channel, index: number) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={channelId === channel?.id ? 'selected' : ''}
                    routerLink={buildLink('/posts', communityId, channel?.id)}
                    lines="none"
                    detail={false}
                  >
                    <i
                      className={`icon ion-md-${channel?.icon || 'help'}`}
                      {...icon}
                    />
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
