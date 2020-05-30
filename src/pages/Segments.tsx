import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonRow, IonCol, IonButton } from '@ionic/react';
import { personOutline, home, heart, pin, star, globe, basket, camera, bookmark } from 'ionicons/icons';
import {MainHome} from '../components/MainHome';
import Events from '../components/Events';
import Posts from '../components/Posts';
import Notify from '../components/Notify';



export const SegmentExamples: React.FC = () => {
   const [page,setPage] = useState("home");


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PCE CONNECT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      
       
       
        <IonSegment onIonChange={e => e.detail.value? setPage(e.detail.value):console.log("err")}>
          <IonSegmentButton value="home">
            <IonIcon icon={home} />
          </IonSegmentButton>
          <IonSegmentButton value="events">
            <IonIcon icon={pin} />
          </IonSegmentButton>
          <IonSegmentButton value="posts">
            <IonIcon icon={heart} />
          </IonSegmentButton>
          <IonSegmentButton value="notifications">
            <IonIcon icon={personOutline} />
          </IonSegmentButton>
        </IonSegment>
        <IonRow>
          <IonCol>
            {
              page==="home" && (
                <MainHome/>
              )
            }
             {
              page==="events" && (
               <> 
                 <h2>All Events</h2>
                <Events/></>
              )
            }
             {
              page==="posts" && (
                <Posts/>
              )
            }
             {
              page==="notifications" && (
                <Notify/>
              )
            }
          </IonCol>
        </IonRow>

      </IonContent>
    </IonPage>
  );
};
