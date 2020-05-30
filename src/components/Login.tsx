import React,{useState} from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import {Link, Redirect, Router} from 'react-router-dom';
import { LoginFetch } from '../helpers/login';
import { Plugins } from '@capacitor/core';
import {API} from '../backend';
import { isAuthenticated,authenticate } from '../helpers/auth';


const { Storage } = Plugins;
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [value,setValue] = useState({
    email:"ionic@gmail.com",
    password:"ionichardik"
  });
  
   
  const {email,password} = value;
  const [isloggedin,setLogging] = useState(false);
   const performRedirect = ()=>{
     if(isloggedin){
       return <Redirect to ="/main"/>
     }
   }
  const authCheck = async()=>{
    if(isAuthenticated())setLogging(true);
    else setLogging(false);
  }
  const onSubmit = async (e:any)=>{
   
   LoginFetch(value)
   .then(async(user)=>{
      await Storage.set({
         key: 'token',
         value: user.token
      });
      await Storage.set({
        key: 'user',
        value: user.user
      });
       authenticate(user,()=>{
         setLogging(true);
       });
   })
   .catch(err=>console.log(err));
   
    
 

  }

  return (
    <div className="container">
      <IonGrid >
        <IonRow>
          <IonCol>
            <IonText color="primary">
             <h1>Welcome to PCE Connect</h1>
            
               {performRedirect()}
              
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
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"16px"}} type="email" value={email}
                  onIonChange={(e:any)=> setValue({ ...value,email: (e.target as HTMLInputElement).value})} placeholder="Enter Password">
                </IonInput>
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"16px"}} type="password" value={password}
                  onIonChange={(e:any)=> setValue({ ...value,password: (e.target as HTMLInputElement).value})} placeholder="Enter Password">
                </IonInput>
               
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            
            <IonButton onClick={onSubmit}>submit</IonButton>
            
         
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
