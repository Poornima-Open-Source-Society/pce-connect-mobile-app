import { Plugins } from '@capacitor/core';
import {API} from '../backend';
const { Storage } = Plugins;


export const LoginFetch = (val:Object)=>{
    
    return fetch(`${API}/signin`,{
        method :"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(val)
    })
    .then(async res=>{
        const jsonres = await res.json();
        return jsonres;
    })
    .catch(err=> console.log(err));

};

