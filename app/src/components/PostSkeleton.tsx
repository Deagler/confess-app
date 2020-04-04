import { IonCard, IonLabel, IonSkeletonText } from '@ionic/react';
import React from 'react';

const PostSkeleton: React.FC<{}> = () => (
  <IonCard>
    <div className="ion-padding">
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: '40%' }} />
      </IonLabel>
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: '20%' }} />
      </IonLabel>
      <SkeletonParagraph />
      <br />
      <SkeletonParagraph />
      <IonLabel>
        <IonSkeletonText animated={true} style={{ width: '20%' }} />
      </IonLabel>
    </div>
  </IonCard>
);

const SkeletonParagraph: React.FC<{}> = () => (
  <>
    <IonSkeletonText animated={true} />
    <IonSkeletonText animated={true} />
    <IonSkeletonText animated={true} />
    <IonSkeletonText animated={true} />
    <IonSkeletonText animated={true} style={{ width: '60%' }} />
  </>
);

export default PostSkeleton;
