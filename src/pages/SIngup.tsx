import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import Signup from '../components/Signup';
import './Home.css';
import Back from '../components/Backbtn';

const SignupPage: React.FC = () => {
  return (
    <IonPage>
     
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
           
          </IonToolbar>
        </IonHeader>
        
        <Signup />
       
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
