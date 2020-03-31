import React, { useState } from 'react';
import {
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';

export interface ChannelListProps {
  channels?: string[];
  loading: boolean;
}

const ChannelList: React.FC<ChannelListProps> = (props: ChannelListProps) => {
  const { loading, channels } = props;

  const [selectedChannel, setSelectedChannel] = useState<string>();

  return (
    <IonList>
      {loading ? (
        <IonItem>...Loading</IonItem>
      ) : (
        <>
          <IonMenuToggle autoHide={false}>
            <IonItem
              className={selectedChannel === 'all' ? 'selected' : ''}
              routerLink={`/page/posts`}
              routerDirection="none"
              lines="none"
              detail={false}
              onClick={() => setSelectedChannel('all')}
            >
              <IonIcon slot="start" icon={airplaneOutline} />
              <IonLabel>All</IonLabel>
            </IonItem>
          </IonMenuToggle>

          {channels &&
            channels.map((channel: string, index: number) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={selectedChannel === channel ? 'selected' : ''}
                  routerLink={`/page/posts?community=${channel}`}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <IonIcon slot="start" icon={airplaneOutline} />
                  <IonLabel>{channel}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
        </>
      )}
    </IonList>
  );
};

export default ChannelList;
