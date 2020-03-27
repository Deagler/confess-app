import React, { useState } from 'react';
import { IonPage } from '@ionic/react';

import Post, { PostProps } from '../components/Post';
import { useParams, Route } from 'react-router-dom';

const Postpage: React.FC = () => {
  const { id } = useParams();
  return <IonPage>{id}</IonPage>;
};

export default Postpage;
