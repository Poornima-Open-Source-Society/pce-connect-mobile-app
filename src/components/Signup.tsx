import React,{useState} from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import Back from './Backbtn';
import {SignupFetch} from '../helpers/signup';
interface LoginProps { }
interface myvalues{
  name:string;
  email:string;
  section:string;
  password:string;
}
const Signup: React.FC<LoginProps> = () => {
    const [value,setValues] = useState<myvalues>({
      name:""!,
      email:""!,
      section:""!,
      password:""!,
    });
    const {name,email,section,password} = value;

    const onSubmit = ()=>{
       SignupFetch(value)
       .then(res=>console.log(res))
       .catch(err=> console.log(err));

    };
   
   
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
             <h2>Sigup</h2>
             </IonText>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <input style={{backgroundColor:"black",color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Email" value={email} 
                onChange={(ev: React.ChangeEvent<HTMLInputElement>):void=>{setValues({...value,email:ev.target.value})}}>
                </input>
              </IonItem>

              <IonItem>
                <IonLabel>Name</IonLabel>
                <input style={{backgroundColor:"black",color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Name" value={name} 
                onChange={(ev: React.ChangeEvent<HTMLInputElement>):void=>{setValues({...value,name:ev.target.value})}}>
                </input>
              </IonItem>

              <IonItem>
                <IonLabel>Section</IonLabel>
                <input style={{backgroundColor:"black",color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Section" value={section} 
                onChange={(ev: React.ChangeEvent<HTMLInputElement>):void=>{setValues({...value,section:ev.target.value})}}>
                </input>
              </IonItem>
              <IonItem>
                <IonLabel >Password</IonLabel>
                <input style={{backgroundColor:"black",color:"dodgerblue",borderStyle:"none",fontSize:"16px"}} type="password" value={password}
                 onChange={(ev: React.ChangeEvent<HTMLInputElement>):void=>{setValues({...value,password:ev.target.value})}} placeholder="Enter Password">
                </input>
              </IonItem>

          </IonCol>
        </IonRow>
       
             
       
        <IonRow>
          <IonCol>
            <IonButton onClick={onSubmit}>submit</IonButton>
            <Back/>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Signup;
