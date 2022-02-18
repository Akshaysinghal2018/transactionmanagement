import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Profilemenu from './Profilemenu'
import UserProfile from './UserProfile'
import ProfileAddress from './ProfileAddress'
import EditProfile from './EditProfile'
import ProfileOrder from './ProfileOrder'
import {useState} from 'react'
import EditImage from './EditImage'
import RecoverPassword from './RecoverPassword'
import Addaddress from './Addaddress'
import Updateaddress from './Updateaddress'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import Order from '../../Orders/Order'
function Profile() {
    function updateaddress(data,item){
        setprofilecmp(<Updateaddress  id={data} item={item}/>)
    }
    //console.log(encryptStorage.getItem("user"))
    const profilecomponent=(data)=>{
        
        if(data=="profile"){
            setprofilecmp(<UserProfile  profilecomponent={profilecomponent}/>)
        }
        if(data=="Address"){
            setprofilecmp(<ProfileAddress profilecomponent={profilecomponent} updateaddress={updateaddress}/>)
        }
        if(data=="editprofile"){
            setprofilecmp(<EditProfile />)
        }
        if(data=="orders"){
            setprofilecmp(<Order />)
        }
        if(data=="editimage"){
            setprofilecmp(<EditImage />)
        }
        if(data=="changepassword"){
            setprofilecmp(<RecoverPassword />)
        }
        if(data=="addAddress"){
            setprofilecmp(<Addaddress />)
        }
    }
    const [profilecmp, setprofilecmp] = useState(<UserProfile  profilecomponent={profilecomponent}/>)
    return (
        <div style={{margin:"20px"}}>
            <h1>My Account</h1>
            <Row style={{border:"1px solid black"}}>
                <Col lg={4} md={4} sm={6} >
                    <Profilemenu profilecomponent={profilecomponent}/>
                </Col>
                <Col lg={8} md={8} sm={6} style={{borderLeft:"1px solid black",padding:"20px"}}>
                    {profilecmp}
                </Col>
            </Row>
        </div>
    )
}

export default Profile
