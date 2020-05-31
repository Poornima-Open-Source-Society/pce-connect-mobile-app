import React,{useState,useEffect} from 'react';
import {IonImg,IonModal,IonButton,IonCard,IonCardContent,IonSpinner,IonCardHeader,IonCardSubtitle,IonCardTitle, IonContent, IonItem, IonLabel} from '@ionic/react'
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
            style={{height:'50px',
             backgroundColor:'black',
             borderStyle:"none",
             textDecoration:"none",
             color:'white',
            width:"220px"}}
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            />
          
          </div>
          </IonItem>
          <IonItem>
          <div className="form-group">
          <input
          onChange={handleChange("title")}
          name="photo"
          className="form-control  text-white"
          style={{backgroundColor:'black'
          ,borderStyle:"none",
           fontSize:'26px',
           marginTop:"17px"
           }}
          placeholder="Enter title"
          value={title}
          />
         </div>
         </IonItem>
         <IonItem>
         <div className="form-group">
         <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control bg-dark text-white"
          style={{backgroundColor:'black',
          borderStyle:'none',
           fontSize:'21px',
           marginTop:"10px",
           width:"100%"
        }}
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
         <h2 style={{marginLeft:'20%'}}>Create Cool post</h2>
         {PostForm()}
         <IonButton
         color="primary"
        type="submit"
        onClick={onSubmit}
        className="btn btn-success">
        Post
      </IonButton>
      <IonButton
         color="danger"
        type="submit"
        onClick={()=>setEbtn(false)}
        className="btn btn-danger">
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
