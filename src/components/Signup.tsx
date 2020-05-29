import React,{useState} from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol, IonContent, IonText, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import Back from './Backbtn';
import {SignupFetch} from '../helpers/signup';
import { Redirect } from 'react-router';
interface LoginProps { }
interface myvalues{
  name:string ;
  email:string;
  section:string ;
  password:string;
}
interface eventprops {
  name:string,
  event: React.ChangeEvent<HTMLIonInputElement>
}
const Signup: React.FC<LoginProps> = () => {
    const [value,setValues] = useState<myvalues>({
      name:"",
      email:"",
      section:"",
      password:"",
    });
    const [load,setload] = useState({
      error:"",
      success:false,
      loading:false
    });  
   
    const {name,email,password,section} = value;
    const {success,loading,error} = load;
    const onSubmit = ()=>{
       SignupFetch(value)
       .then(res=>{
         setload({...load,success:true,loading:false})
       })
       .catch(err=> {setload({...load,success:false,loading:false})});
    };
   const performReditect = ()=>{
     if(success===true)return <Redirect to ="/home"/>
   }
   
  return (
    <div className="container">
      {performReditect()}
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
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Email" value={email} 
                onIonChange={(e:any)=> setValues({ ...value,email: (e.target as HTMLInputElement).value})}>
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Name</IonLabel>
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Name" value={name} 
                 onIonChange={(e:any)=> setValues({ ...value,name: (e.target as HTMLInputElement).value})}>
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Section</IonLabel>
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter Section" value={section} 
                  onIonChange={(e:any)=> setValues({ ...value,section: (e.target as HTMLInputElement).value})}>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel >Password</IonLabel>
                <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"16px"}} type="password" value={password}
                  onIonChange={(e:any)=> setValues({ ...value,password: (e.target as HTMLInputElement).value})} placeholder="Enter Password">
                </IonInput>
              </IonItem>

          </IonCol>
        </IonRow>
       
             
       
        <IonRow>
          <IonCol>
            <IonButton onClick={onSubmit}>submit</IonButton>
            <Back title="back"/>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Signup;
