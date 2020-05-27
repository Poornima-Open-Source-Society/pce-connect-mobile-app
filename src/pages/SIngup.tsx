import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import Signup from '../components/Signup';
import './Home.css';
import Back from '../components/Backbtn';

const SignupPage: React.FC = () => {
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
        
        <Signup />
       
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
