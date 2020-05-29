import React,{useState,useEffect} from 'react';
import {IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle} from '@ionic/react'
import { EventFetch } from '../helpers/posts';

interface mydata{

}
 const Events:React.FC = ()=>{
    const [data,setData] = useState([]);
    const [load,setLoad] = useState({
        error:"",
        loading:true
    });
    useEffect(()=>{
        EventFetch()
        .then((d)=>{
            console.log(d);
            setData(d);
            console.log(data);
             
        })
        .catch(err=>console.log(err));
    },[]);
   
    return (
        <>
           { data &&
          data.map((d:any,ind:any)=>{
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