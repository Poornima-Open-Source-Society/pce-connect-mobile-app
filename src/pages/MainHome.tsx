import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenuButton, IonButtons, IonIcon } from '@ionic/react';
import Back from '../components/Backbtn';
import { signout } from '../helpers/auth';

const Main:React.FC = ()=>{
    
    return(
        
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
        
        <IonButton onClick={signout} title="signout">signout</IonButton>
       
       
      </IonContent>
    </IonPage>
       
         
        
    )
};
export default Main;
