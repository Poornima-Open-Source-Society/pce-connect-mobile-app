import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import Login from '../components/Login';
import './Home.css';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Login />
        <IonHeader style={{left:"23%"}} >Made with love by Hardik </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
