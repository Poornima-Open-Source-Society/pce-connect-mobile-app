import React from 'react';
//import fetch from 'cross-fetch';
import {API} from '../backend';
export const SignupFetch = (val:Object)=>{
    return fetch(`${API}/signup`,{
        method :"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(val)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=> console.log(err));

};

