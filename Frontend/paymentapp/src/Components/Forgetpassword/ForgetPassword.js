import React from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {forgetpassworduser} from '../../Services/services'
import {useState} from 'react'
function ForgetPassword() {
    const [email, setemail] = useState("")
    const [userid, setuserid] = useState("")
    const [alertdata, setalertdata] = useState("")
    const handler=(e)=>{
        setemail(e.target.value)
    }
    const submit=(e)=>{
        e.preventDefault()
        setalertdata("Otp send to the email")
        forgetpassworduser({email:email,id:userid}).then(data=>{
            
        })
        setTimeout(()=>{
           window.location.replace(`/recoverpassword?email=${email}`) 
        },5000)
    }
    return (
        <div>
            <Container>

                <Form onSubmit={submit}>
                    <p style={{color:"red"}}>{alertdata}</p>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="email" onChange={handler} />
                        
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Forget Password
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default ForgetPassword
