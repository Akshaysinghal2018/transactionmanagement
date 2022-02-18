import axios from 'axios'
import {url} from '../ConfigFiles/URL'
import {encryptStorage} from '../ConfigFiles/EncryptStorage'
const header={headers: {
  'Authorization': 'Bearer ' + encryptStorage.getItem('token')
}}
  
export const registeruser=(data)=>{
    return(axios.post(`${url}/registeruser`,data))
}
export const registeruserbysocial=(data)=>{
    return(axios.post(`${url}/registeruserbysocial`,data))
}
export const loginuser=(data)=>{
    return(axios.post(`${url}/checkuser`,data))
}
export const forgetpassworduser=(data)=>{
    return(axios.post(`${url}/forgetpassword`,data))
}
export const updatepassworduser=(data)=>{
    return(axios.post(`${url}/updatepassword`,data))
}
export const updateprofileimage=(data)=>{
    return(axios.post(`${url}/changeprofileimage`,data))
}
export const updateprofiledata=(data)=>{
    return(axios.post(`${url}/updateprofile`,data))
}
export const addAddress=(data)=>{
    return(axios.post(`${url}/addAddress`,data))
}
export const updateAddress=(data)=>{
    return(axios.post(`${url}/updateAddress`,data))
}
export const deleteAddress=(data)=>{
    return(axios.post(`${url}/deleteAddress`,data))
}
export const getUser=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/getuser`,data))
}
export const getCart=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/getcart`,data,header))
}
export const updateCart=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/updatecart`,data))
}
export const removecart=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/removecart`,data))
}
export const checkout=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/checkout`,data,header))
}
export const getorder=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/getorder`,data,header))
}
export const getAllorder=()=>{
    //console.log(data)
    return(axios.get(`${url}/getAllorder`,header))
}
export const getinvoice=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/getinvoice`,data,header))
}
