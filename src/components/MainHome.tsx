import React,{useState,useEffect} from 'react';
import {IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle} from '@ionic/react'
import { PostFetch } from '../helpers/posts';

interface mydata{

}
export const MainHome:React.FC = ()=>{
    const [data,setData] = useState([]);
    const [load,setLoad] = useState({
        error:"",
        loading:true
    });
    useEffect(()=>{
        PostFetch()
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
                <IonCard>
                <IonCardHeader>
              <IonCardSubtitle>{d.postedBy.name} section {d.postedBy.section}</IonCardSubtitle>
              <IonCardTitle>{d.title}</IonCardTitle>
                </IonCardHeader>
      
                <IonCardContent>
                   {d.description}
                </IonCardContent>
              </IonCard>
              )
          })}
        </>
        
    )
};
