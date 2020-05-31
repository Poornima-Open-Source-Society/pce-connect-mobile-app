import React,{useState,useEffect} from 'react';
import {IonImg,IonHeader,IonInput,IonModal,IonButton,IonCard,IonCardContent,IonSpinner,IonCardHeader,IonCardSubtitle,IonCardTitle, IonContent, IonItem, IonLabel, IonTextarea} from '@ionic/react'
import { PostFetch } from '../helpers/posts';
import { Plugins,CameraResultType  } from '@capacitor/core';
import { API } from '../backend';
const { Storage } = Plugins;
const { Camera } = Plugins;

interface mydata{

}
export const MainHome:React.FC = ()=>{

  

  const [eventBtn,setEbtn] = useState(false);
    
    const [data,setData] = useState([]);
    const [load,setLoad] = useState({
        error:"",
        loading:true
    });
    const {loading} = load;

    const [values, setValues] = useState({
      title: "",
      description: "",
      photo: "",
      error: "",
      createdProduct: "",
      formData: new FormData()
    });
    const createEvent = ()=>{
      setEbtn(true);
    };
    const {
      title,
      description,
      photo,
      formData
    } = values;
    


    useEffect(()=>{
        PostFetch()
        .then((d)=>{
            console.log(d);
            setData(d);
            setLoad({...load,loading:false});
        })
        .catch(err=>console.log(err));
       
    },[]);
    const handleChange = (name:string) => (event:any) => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };
   
    const createPost = (value:any,token:string,formData:any)=>{
      return fetch(`${API}/user/${value}/createPost`,{
        method:"POST",
        headers:{ Accept:"application/json",
                  Authorization :`Bearer ${token}`
                 },
        body:formData
     })
     .then(response =>{
         console.log(response);
         return response.json();
     })
     .catch(err=>console.log(err));
    }
    

    const onSubmit = async(e:any)=>{
          e.preventDefault();
          setValues({ ...values, error: "" });
          var token:any = (await Storage.get({ key: 'token' })).value;
          const { value } = await Storage.get({ key: 'user' });
          if(value)formData.set('postedBy',value);
           createPost(value, token, formData)
          .then((data:any) => {
            if (data.err|| data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setValues({
                ...values,
                title: "",
                description: "",
               photo: "",
              error: "",
                 createdProduct: "",
              });
            }
          })
          .catch(err=>console.log(err));
          setEbtn(false);
         
          
    }
    const PostForm = ()=>{
      return (
        <IonContent>
         
        <form style={{marginTop:"15%"}}>
           
           <IonItem>
          <div className="form-group">
          <IonLabel >upload photo</IonLabel>
            <input
            onChange={handleChange("photo")}
            name="photo"
            accept="image"
            type="file"
            placeholder="choose a file"
            />
          
          </div>
          </IonItem>
          <IonItem>
          <div className="form-group">
          <IonInput
          onIonChange={handleChange("title")}
          name="photo"
          
          placeholder="Enter title"
          value={title}
          />
         </div>
         </IonItem>
         <IonItem>
         <div className="form-group">
         <IonTextarea
          onIonChange={handleChange("description")}
          name="photo"
        
          placeholder="Description"
          value={description}
         />
         </div>
         </IonItem>
        
        </form>
        </IonContent>
      )
    }
   
    return (
        <>  
         <IonModal isOpen={eventBtn} cssClass='my-custom-class'>
         <IonItem>
           <IonHeader style={{marginLeft:'25%'}}> Create Cool post</IonHeader>
         </IonItem>
         {PostForm()}
         <IonButton
         color="primary"
        type="submit"
        onClick={onSubmit}>
        Post
      </IonButton>
      
      <IonButton
         color="danger"
        type="submit"
        onClick={()=>setEbtn(false)}
        >
        Go back
      </IonButton>
         </IonModal>
        <IonButton color="primary" onClick={createEvent}>create Post</IonButton>
          {loading && (
               <IonSpinner className="spin" name="bubbles" color="primary"/>
          )}
           { data &&
          data.map((d:any,ind:any)=>{
              return (
               d &&
               ( <IonCard>
                <IonCardHeader>
                <IonCardSubtitle>{d.postedBy.name} section {d.postedBy.section}</IonCardSubtitle>
              <IonCardTitle>{d.title}</IonCardTitle>
                </IonCardHeader>
                 <img src={`${API}/photo/${d._id}`}/>
                <IonCardContent>
                   {d.description}
                </IonCardContent>
              </IonCard>)
              )
          })}
        </>
        
    )
};
