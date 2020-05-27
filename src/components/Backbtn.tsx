import React from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import {Link} from 'react-router-dom';
interface BackProps { }

const Back: React.FC<BackProps> = () => {
  return (
    <div className="back">
        <IonRow>
            <IonCol>
            <Link to ="/">
             <IonButton color="primary">
                  Back
              </IonButton>
            </Link>
            </IonCol>
        </IonRow>
       
       
    </div>
  );
};

export default Back;
