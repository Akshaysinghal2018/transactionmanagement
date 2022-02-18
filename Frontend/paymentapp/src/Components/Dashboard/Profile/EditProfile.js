import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {useState,useEffect} from 'react'
import {updateprofiledata} from '../../../Services/services'
import swal from 'sweetalert2'
function EditProfile({profilecomponent}) {
    const [user, setuser] = useState(encryptStorage.getItem('user'))
    if(user.gender==undefined){
        user.gender="male"
    }
    if(user.phone_no==undefined){
        user.phone_no=9999999998
    }
    if(user.DOB==undefined){
        user.DOB="01/01/2000"
    }
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [gender, setgender] = useState("")
    const [DOB, setDOB] = useState("")
    const [phone_no, setphone_no] = useState("")
    const [email, setemail] = useState("")
    useEffect(() => {
        setfirstname(user.first_name)
        setlastname(user.last_name)
        setgender(user.gender)
        setDOB(user.DOB)
        setphone_no(user.phone_no)
        setemail(user.email)
        
    }, [])
    const handler=(e)=>{
        const id=e.target.id
        if(id=="firstname"){
            setfirstname(e.target.value)
        }
        if(id=="lastname"){
            setlastname(e.target.value)
        }
        if(id=="gender"){
            setgender(e.target.value)
        }
        if(id=="DOB"){
            setDOB(e.target.value)
        }
        if(id=="phone_no"){
            setphone_no(e.target.value)
        }
        if(id=="email"){
            setemail(e.target.value)
        }
    }

    const submit=(e)=>{
        e.preventDefault()
        var id=encryptStorage.getItem("user").userid
        if(id==undefined){
            id=encryptStorage.getItem("user")._id
        }
        const data={id:id,firstname:firstname,lastname:lastname,gender:gender,DOB:DOB,phone_no:phone_no,email:email}
    console.log(data)
        updateprofiledata(data).then(data=>{
            swal.fire(data.data.message)
             window.location.reload("")
        })
    }
    return (
        <div>
            <h1>Edit Profile</h1>
            <hr/>
            <form onSubmit={submit}>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>First Name</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                    <input type="text" id="firstname" defaultValue={user.first_name} onChange={handler} />
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Last Name</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                <input type="text" id="lastname" defaultValue={user.last_name} onChange={handler} />
                
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Gender</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                <input type="text" id="gender" defaultValue={user.gender} onChange={handler} />
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Date Of Birth</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                <input type="text" id="DOB" defaultValue={user.DOB} onChange={handler} />
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Mobile Number</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                <input type="text" id="phone_no" defaultValue={user.phone_no} onChange={handler} />
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6}>
                <h6>Email Address</h6>
                </Col>
                <Col lg={3} md={3} sm={6}>
                <input type="text" id="email" defaultValue={user.email} onChange={handler} />
                </Col>
            </Row>
            
                
                <Button  type="submit" variant={"light"} style={{border:"1px solid black"}}>Edit</Button>
                </form>
             </div>
    )
}

export default EditProfile
