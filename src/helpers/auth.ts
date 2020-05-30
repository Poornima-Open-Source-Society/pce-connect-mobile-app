import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


export const authenticate = async(data:any,next:any)=>{
    console.log(data);
    await Storage.set({
        key:'token',
        value:data.token
    });
    await Storage.set({
       key:'user',
       value:data.user._id
   });
   const { value } = await Storage.get({ key: 'token' });
   console.log('Got item token: ', value);
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
   next();

}


export const isAuthenticated = async ()=>{
    const { value } = await Storage.get({ key: 'token' });
    const { keys } = await Storage.keys();
     if(keys.length){
         return true;
     }else return false;
};
export const signout = async()=>{
    // await Storage.remove({ key: 'user' });
    // await Storage.remove({ key: 'token' });
    const { keys } = await Storage.keys();
    console.log(keys);

}
