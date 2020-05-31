import React,{useState} from 'react';
import './ExploreContainer.css';
import { IonSpinner,IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import {Link, Redirect, Router} from 'react-router-dom';
import { LoginFetch } from '../helpers/login';
import { Plugins } from '@capacitor/core';
import {API} from '../backend';
import { isAuthenticated,authenticate } from '../helpers/auth';


const { Storage } = Plugins;
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [value,setValue] = useState({
    email:"",
    password:""
  });
    
  const [err,setErr] = useState("");
  const [loading,setLoad] = useState(false);

  
   
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
   setLoad(true);
   LoginFetch(value)
   .then(async(user)=>{
      if(user.err || user.error){
        setErr(user.err|| user.error);
        setLogging(false);
        setLoad(false);
        return;
      }
       authenticate(user,()=>{
         setLogging(true);
       });
       setLoad(false);
   })
   .catch(err=>setErr("you can not login please signup"));
  }
  const showErr = ()=>{
    return (
      err && (
          <IonItem><h5>got error {err}</h5></IonItem>
      )
    )
  }

  return (
    <div className="container">
      <IonGrid >
        <IonRow>
          <IonCol>
            <IonText color="primary">
             <h1>Welcome to PCE Connect</h1>
             { loading && (
            <IonSpinner className="spin" name="bubbles" color="primary"/>
              )}
                {showErr()}
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
                  onIonChange={(e:any)=> setValue({ ...value,email: (e.target as HTMLInputElement).value})} placeholder="Enter email">
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
