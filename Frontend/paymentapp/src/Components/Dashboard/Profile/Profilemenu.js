import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {useState} from 'react'

function Profilemenu({profilecomponent}) {
    const [user, setuser] = useState(encryptStorage.getItem("user"))
    const [profileimage, setprofileimage] = useState("../Images/user.jpg")
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    //console.log(user)
    useEffect(() => {
        if(user.profile_img==undefined){
            setprofileimage("../Images/user.jpg")
        }
        else{
            setprofileimage(`http://localhost:8899/images/${user.profile_img}`)
        }
        
        
    }, [])
    //console.log(user.profile_img)
    return (
        <div style={{textAlign:"center"}}>
            <Image src={profileimage} alt='Profile Image' roundedCircle style={{width:"150px",height:"150px",border:"1px solid black",marginTop:"20px"}} onClick={()=>profilecomponent("editimage")}/>
            <h4>{user.first_name+" "+user.last_name}</h4>
            <div>
                <ul style={{listStyleType:"none",color:"blue"}}>
                    <li onClick={()=>profilecomponent("orders")} style={{cursor:"pointer"}}>Order</li>
                    <li onClick={()=>profilecomponent("profile")} style={{cursor:"pointer"}}>Profile</li>
                    <li onClick={()=>profilecomponent("Address")} style={{cursor:"pointer"}}>Address</li>
                    <li onClick={()=>profilecomponent("changepassword")} style={{cursor:"pointer"}}>Change Password</li>
                </ul>
            </div>
        </div>
    )
}

export default Profilemenu
