import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {useState,useEffect} from 'react'
import { getUser } from '../../../Services/services'
function UserProfile({profilecomponent}) {
    const [user, setuser] = useState([])
    var id=encryptStorage.getItem("user").userid
    if(id==undefined){
        id=encryptStorage.getItem("user")._id
    }
    const data1={userid:id}
    useEffect(() => {
        getUser(data1).then(data=>{
            //console.log(data.data[0])
            setuser(data.data[0])
        })
    }, [])
    if(user.gender==undefined){
        user.gender="male"
    }
    if(user.phone_no==undefined){
        user.phone_no=9999999998
    }
    if(user.DOB==undefined){
        user.DOB="01/01/2000"
    }
    return (
        <div>
            <h1>Profile</h1>
            <hr/>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>First Name</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.first_name}
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Last Name</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.last_name}
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Gender</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.gender}
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Date Of Birth</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.DOB}
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Mobile Number</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.phone_no}
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Email Address</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                {user.email}
                </Col>
            </Row>
            
                
                <Button  variant={"light"} style={{border:"1px solid black"}} onClick={()=>profilecomponent("editprofile")}>Edit</Button>
                
             </div>
    )
}

export default UserProfile
