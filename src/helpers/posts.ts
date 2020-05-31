import {API} from '../backend';
export const PostFetch = ()=>{
    return fetch(`${API}/posts`,{
        method :"GET",
        headers:{
          Accept:"application/json"
        }
    })
    .then(async res=>{
        return await res.json();
    })
    .catch(err=> console.log(err));

};
export const EventFetch = ()=>{
    return fetch(`${API}/events`,{
        method :"GET",
        headers:{
          Accept:"application/json"
        }
    })
    .then(async res=>{
        return await res.json();
    })
    .catch(err=> console.log(err));

};

export const UserFetch = ()=>{
    return fetch(`${API}/users`,{
        method :"GET",
        headers:{
          Accept:"application/json"
        }
    })
    .then(async res=>{
        return await res.json();
    })
    .catch(err=> console.log(err));

};





