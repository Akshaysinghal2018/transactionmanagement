import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import {  loginuser,registeruser, } from '../../Services/services'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import swal from 'sweetalert2';
import "./index.css"
function Login(props) {
    useEffect(() => {
        if(encryptStorage.getItem("user")!=undefined){
            window.location.replace("/dashboard")
        }
    }, [])
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const handler = (e) => {
        const id = e.target.id
        if (id == "email") {
            setemail(e.target.value)
        }
        else {
            setpassword(e.target.value)
        }
    }
    
    const submit = (e) => {
        e.preventDefault()
        if (email !== "") {
            const data = { "email": email, "password": password }
            
            console.log(data)
            loginuser(data).then(data => {
                console.log(data.data.success)
                if (data.data.success == true) {
                    swal.fire(   
                        'login Successfull!!',
                        data.data.message,
                        'success'
                      )
                    encryptStorage.setItem("user", JSON.stringify(data.data.customer_details))
                    //encryptStorage.setItem("cart", JSON.stringify([]))
                    encryptStorage.setItem("token", JSON.stringify(data.data.token))
                    window.location.replace('/dashboard')
                }
                else {
                    swal.fire(data.data.message)
                }
            })
        }
        else {
            swal.fire("invalid feild")
        }
    }
    return (
        <Container className="mt-4" style={{width:"40%",marginLeft:"30%",border:"2px solid black",padding:"20px"}}>
                <h4>Login</h4>
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="email" onChange={handler} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" onChange={handler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
             <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <p style={{ color: "black" }}><a href="/register" >New User</a></p>
            </Container>
        </Container>
    )
}

export default Login
