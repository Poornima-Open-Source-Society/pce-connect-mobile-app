import React,{useState,useEffect} from 'react';
import {IonModal, IonSpinner, IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonContent} from '@ionic/react'
import { EventFetch } from '../helpers/posts';
import '../theme/style.css';
import { API } from '../backend';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

interface mydata{

}
 const Events:React.FC = ()=>{
    const [data,setData] = useState({
        name:"",
        description:"",
        organiser:"",
        venue:""
    });
    const {name,description,organiser,venue} = data;
    const [edata,setEdata] = useState([]);
    const [load,setLoad] = useState({
        error:"",
        loading:true
    });

    const {loading} = load;
    const setOrganiser = async()=>{
      const { value } = await Storage.get({ key: 'user' });
      console.log(JSON.stringify(value));
      if(value)
      setData({...data,organiser:value});       
     };
    const [eventBtn,setEbtn] = useState(false);
    

    useEffect(()=>{
      setOrganiser();
        EventFetch()
        .then((d)=>{
            console.log(d);
            setEdata(d);
           setLoad({...load,loading:false});  
            
        })
        .catch(err=>console.log(err));
       
    },[]);

    const createEvent = ()=>{
        setEbtn(true);
    };
    const handleSubmit =async(event:any)=>{
        event.preventDefault();
       
        var token:any = (await Storage.get({ key: 'token' })).value;
        const { value } = await Storage.get({ key: 'user' });
        
       

    fetch(`${API}/user/${value}/createEvent`, {
      method: 'POST',
      headers: new Headers({
        Accept:"application/json",
        "Content-Type":"application/json",
        'Authorization':`Bearer ${token}`,
      }),
      body:JSON.stringify(data),
    }).then((data)=>console.log(data))
    .catch(err=>console.log(err));
    setEbtn(false)
    
    }
   
    return (
        <>
        <IonModal isOpen={eventBtn} cssClass='my-custom-class'>
         <h2 style={{marginLeft:'20%'}}>Create Cool Event</h2>
         
              <IonContent>
                 <IonLabel>Event Name</IonLabel>
                 <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="Enter name" value={name} 
                onIonChange={(e:any)=> setData({ ...data,name: (e.target as HTMLInputElement).value})}/>
           
                 <IonLabel>Venue</IonLabel>
                 <IonInput style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}} placeholder="eg. CCG-05" value={venue} 
                onIonChange={(e:any)=> setData({ ...data,venue: (e.target as HTMLInputElement).value})}/>
           
                 <IonLabel>Description</IonLabel>
                 <IonTextarea placeholder="eg. event on Web "   style={{color:"dodgerblue",borderStyle:"none",fontSize:"20px"}}  value={description} 
                onIonChange={(e:any)=> setData({ ...data,description: (e.target as HTMLInputElement).value})}></IonTextarea>
              </IonContent>
             <IonButton type="submit" onClick={handleSubmit}>Submit</IonButton>
             <IonButton type="submit" color="danger" onClick={()=>setEbtn(false)}>Back</IonButton>
              
         
        
        </IonModal>

        <IonButton color="primary" onClick={createEvent}>create Event</IonButton>
        { loading && (
            <IonSpinner className="spin" name="bubbles" color="primary"/>
        )}
       
           { edata &&
              edata.map((d:any,ind:any)=>{
              return (
                <IonCard key={ind}>
                <IonCardHeader>
              <IonCardSubtitle>{d.organiser.name}</IonCardSubtitle>
              <IonCardTitle>{d.name}</IonCardTitle>
                </IonCardHeader>
      
                <IonCardContent>
                   {d.description}
                   <p>{d.venue}</p> 
                </IonCardContent>
              </IonCard>
              )
          })}
        </>
        
    )
};
export default Events;
