import React,{useState,useEffect} from 'react';
import { UserFetch } from '../helpers/posts';
import { Plugins } from '@capacitor/core';
import {IonModal, IonSpinner,
     IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonContent} from '@ionic/react'
import { signout } from '../helpers/auth';
import { Redirect } from 'react-router';
const { Storage } = Plugins;


const Users:React.FC = ()=>{
    const [userData,setData] = useState([]);
    const [loading,setLoad] = useState(true);
    const [redirect,setRedirect] = useState(false);

    const [you,setYou] = useState({
        email:"",
        name:""
    });
    const {email,name} = you;
    const setInfo = async()=>{
       const naam =  (await Storage.get({ key: 'name' })).value;
       const emaal =  (await Storage.get({ key: 'email' })).value;

       if(naam && emaal)setYou({email:emaal,name:naam});
    }
    
const userCard = ()=>{
     const  performSignout = ()=>{
        signout();
        setRedirect(true);
     }
      
        return(
            <IonItem>
                 <IonCard>
              <IonCardHeader>
            <IonCardSubtitle>{email}</IonCardSubtitle>
            <IonCardTitle>{name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
             <IonButton onClick={performSignout}>Signout</IonButton>
            </IonItem>
        )
    }

    useEffect(()=>{
        setInfo();
        UserFetch()
        .then((data)=>{
            setData(data);
            console.log(data);
            setLoad(false);
        })
        .catch(err=>console.log(err));

        
    },[]);
    return (
        <>
        {redirect &&(
            <Redirect to ="/home"/>
        )}
        { loading && (
            <IonSpinner className="spin" name="bubbles" color="primary"/>
        )}
         {userCard()}
         <h1>Colleagues</h1>
        {  
            userData.map((d:any,ind:any)=>{
            return (
              <IonCard key={ind}>
              <IonCardHeader>
            <IonCardSubtitle>{d.email}</IonCardSubtitle>
            <IonCardTitle>{d.name}</IonCardTitle>
              </IonCardHeader>
    
              <IonCardContent>
                 <p>Section - {d.section}</p> 
              </IonCardContent>
            </IonCard>
            )
        })}
      </>
    )
    
};
export default Users;