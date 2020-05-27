import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import Login from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
               <IonMenuButton autoHide={false}>
               </IonMenuButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot ="icons-only" md="ellipsis-vertical">
              </IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Strandard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default Home;
