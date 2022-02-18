import React from 'react'
import { Container, Button, Form,InputGroup,FormControl } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import {validateemail, validatename,validatemobile,validatepassword} from '../Validations/validation'
import {registeruser} from '../../Services/services'

import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import swal from 'sweetalert2'
import "./index.css"
function Register() {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [mobilenumber, setmobilenumber] = useState("")
    const [gender, setgender] = useState("")
    const [usertype, setusertype] = useState("user")
    const [erroremail, seterroremail] = useState("")
    const [errorfname, seterrorfname] = useState("")
    const [errorlname, seterrorlname] = useState("")
    const [errorpassword, seterrorpassword] = useState("")
    const [errormobilenumber, seterrormobilenumber] = useState("")
    const [errorcpassword, seterrorcpassword] = useState("")
    useEffect(() => {
        if(encryptStorage.getItem("user")!=undefined){
            window.location.replace("/dashboard")
        }
    }, [])
    
    const handler=(e)=>{
        const id=e.target.id;
        
        if(id=="firstname"){
            seterrorfname(validatename(e.target.value))
            setfname(e.target.value)
        }
        if(id=="lastname"){
            seterrorlname(validatename(e.target.value))
            setlname(e.target.value)
        }
        if(id=="email"){
            seterroremail(validateemail(e.target.value))
            setemail(e.target.value)
        }
        if(id=="mobilenumber"){
            seterrormobilenumber(validatemobile(e.target.value))
            setmobilenumber(e.target.value)
        }
        if(id=="password"){
            seterrorpassword(validatepassword(e.target.value))
            setpassword(e.target.value)
        }
        if(id=="confirmpassword"){
            if(password!=e.target.value){
                seterrorcpassword("Confirm password not match with password")
            }
            else{
                seterrorcpassword("")
            }
            setcpassword(e.target.value)
        }
        if(id=="gender"){
            setgender(e.target.value)
        }
        
    }
    const submit=(e)=>{
        e.preventDefault()
        if(password==cpassword){
            if(errorfname!="" || errorlname!="" || erroremail!="" || errormobilenumber!="" || errorpassword!="" || gender==""){
                swal.fire("invalid format")
            }
            else{
                const data={"firstname":fname,"lastname":lname,"email":email,"mobilenumber":mobilenumber,"password":password,"gender":gender,"typeofuser":usertype}
                console.log(data)
                registeruser(data).then(data=>{
                     if(data.data.success!=true){
                         swal.fire(data.data.message)
                     }
                     else{
                         swal.fire(data.data.message)
                         window.location.replace("/login")
                     }
                 })
            }
        }
        else{
            swal.fire("password and confirm password are not same")
        }
    }
    return (
        <div>
            <div>
                <Container style={{ border: "2px solid black",marginTop:"20px",padding:"20px" }}>
                    <Form onSubmit={submit}>
                        <h1>Register</h1>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="First Name"
                                aria-label="First Name"
                                onChange={handler}
                                id="firstname"
                                autoComplete='none'
                            />
                            <InputGroup.Text  ><i class="fa fa-align-justify"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorfname} </p>
                        
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Last Name"
                                aria-label="Last Name"
                                onChange={handler}
                                id="lastname"
                                autoComplete='none'
                            />
                            <InputGroup.Text  ><i class="fa fa-align-justify"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorlname} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Email Address"
                                aria-label="Email Address"
                                id="email" onChange={handler}
                                autoComplete='none'
                            />
                            <InputGroup.Text ><i class="fa fa-envelope"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{erroremail} </p>
                       
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="password"
                                aria-label="password"
                                id="password" onChange={handler}
                                autoComplete='none'
                                type="password"
                            />
                            <InputGroup.Text ><i class="fa fa-eye-slash"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorpassword} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="confirmpassword"
                                aria-label="confirmpassword"
                                id="confirmpassword" onChange={handler}
                                type="password"
                            />
                            <InputGroup.Text ><i class="fa fa-eye-slash"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorcpassword} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Mobile Number"
                                aria-label="Mobile Number"
                                id="mobilenumber" onChange={handler}
                            />
                            <InputGroup.Text ><i class="fa fa-phone"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errormobilenumber} </p>
                        <div  className="mb-3">
      <Form.Check
        inline
        label="Male"
        name="gender"
        type="radio"
        id="gender"
        value="male"
        onChange={handler}
      />
      <Form.Check
        inline
        label="Female"
        name="gender"
        type="radio"
        id="gender"
        value="female"
        onChange={handler}
      />

    </div>              <Button variant="primary" size="lg" type="submit" style={{margin:"20px"}}>
                        Register
                         </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Register
