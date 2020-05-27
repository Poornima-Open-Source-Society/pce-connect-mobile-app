import React from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import {Link} from 'react-router-dom';
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="container">
      <IonGrid >
        <IonRow>
          <IonCol>
            <IonText color="primary">
             <h1>Welcome to PCE Connect</h1>
             </IonText>
          </IonCol>
        </IonRow>
        <IonRow >
          <IonCol>
          <IonText color="primary">
             <h2>Login</h2>
             </IonText>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput placeholder="Enter Email">
                </IonInput>
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput type="password" placeholder="Enter Password">
                </IonInput>
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton>submit</IonButton>
            <Link to ="/signup">
            <IonButton>signup</IonButton>
            </Link>
            

          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Login;
