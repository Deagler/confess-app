import React, { useState } from 'react';
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

const ChannelList: React.FC<{}> = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const { data, loading, error } = useQuery<GetSelectedCommunity>(
    GET_SELECTED_COMMUNITY
  );

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

            {!error &&
              data &&
              data.selectedCommunity!.channels.map((channel, index: number) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      selectedChannel === channel!.name ? 'selected' : ''
                    }
                    routerLink={`/page/posts?community=${channel!.name}`}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                    onClick={() => setSelectedChannel(channel!.name)}
                  >
                    <IonIcon slot="start" icon={airplaneOutline} />
                    <IonLabel>{channel!.name}</IonLabel>
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
