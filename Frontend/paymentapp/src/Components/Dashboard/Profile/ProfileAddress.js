import React from 'react'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {useState,useEffect} from 'react'
import {Container} from 'react-bootstrap'
import { getUser,deleteAddress } from '../../../Services/services'
import swal from 'sweetalert2'

function ProfileAddress({profilecomponent,updateaddress}) {
    const [address, setaddress] = useState([])
    var id=encryptStorage.getItem("user").userid
    if(id==undefined){
        id=encryptStorage.getItem("user")._id
    }
    const data1={userid:id}
    useEffect(() => {
        var id=encryptStorage.getItem("user").userid
        if(id==undefined){
            id=encryptStorage.getItem("user")._id
        }
        const data1={userid:id}
        console.log(data1)
        getUser(data1).then(data=>{
            console.log(data)
            setaddress(data.data[0].Address)
        })
    }, [])
    const deleteaddress=(index)=>{
        deleteAddress({id:id,index:index}).then(data=>{
            //console.log(data)
            if(data.data.success=="true"){
                swal.fire(data.data.message)
                window.location.reload("")
            }
        })
    }
    return (
        <div >

            {
                address.map((item,index)=>{
                        return(
                            <div style={{border:"2px solid black",padding:"20px",borderRadius:"5px",marginTop:"20px"}} key={index}>
                                <p>{item.address}</p>
                                <div style={{display:'flex'}}>
                                <p style={{marginRight:"20px"}}>{item.city}</p>
                                <p style={{marginRight:"20px"}}>{item.state}</p>
                                <p style={{marginRight:"20px"}}>{item.country}</p>
                                <p >{item.pincode}</p>
                            </div>
                                <button type='button' className='btn btn-primary' onClick={()=>updateaddress(index,item)} >Edit</button>
                                <button type='button' className='btn btn-danger' style={{marginLeft:"20px"}} onClick={()=>deleteaddress(index)} >Delete</button>
                                </div>
                        )
                })
            }
            <button type='button' className='btn btn-primary' style={{marginTop:"20px"}} onClick={()=>profilecomponent("addAddress")} >Add Address</button>
        </div>
    )
}

export default ProfileAddress
