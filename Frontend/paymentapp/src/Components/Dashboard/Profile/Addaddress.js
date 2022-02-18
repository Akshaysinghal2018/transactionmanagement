import React from 'react'
import {Container , Form ,Button,Row,Col}  from 'react-bootstrap'
import { addAddress } from '../../../Services/services'
import {useState,useEffect} from 'react'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert2'

function Addaddress() {
    const [address, setaddress] = useState("")
    const [pincode, setpincode] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [country, setcountry] = useState("")
    const [errroraddress, seterrroraddress] = useState("")
    const [errorpincode, seterrorpincode] = useState("")
    const [errorcity, seterrorcity] = useState("")
    const [errorstate, seterrorstate] = useState("")
    const [errorcountry, seterrorcountry] = useState("")
    
    const history =useHistory()
    const handler=(e)=>{
        const id=e.target.id
        if(e.target.id=="address"){
            if(e.target.value.length<11){
                seterrroraddress("address should greater than 11")
            }
            else{
                seterrroraddress("")
            }
            setaddress(e.target.value)
        }
        if(e.target.id=="pincode"){
            
            if(e.target.value.length<6){
                seterrorpincode("enter only a number having length greater than 6")
            }
            else{
                seterrorpincode("")
            }
            setpincode(e.target.value)
        }
        if(e.target.id=="city"){
            if(e.target.value.length<1){
                seterrorcity("feild cannot be empty")
            }
            else{
                seterrorcity("")
            }
            setcity(e.target.value)
        }
        if(e.target.id=="state"){
            if(e.target.value.length<1){
                seterrorstate("feild cannot be empty")
            }
            else{
                seterrorstate("")
            }
            setstate(e.target.value)
        }
        if(e.target.id=="country"){
            if(e.target.value.length<1){
                seterrorcountry("feild cannot be empty")
            }
            else{
                seterrorcountry("")
            }
            setcountry(e.target.value)
        }
    }
    const submit=(e)=>{
        e.preventDefault()
        var data1={id:encryptStorage.getItem("user").userid,address:address,pincode:pincode,city:city,state:state,country:country}
        console.log(encryptStorage.getItem("user"))
        if(errroraddress=="" && errorcity=="" && errorcountry=="" && errorpincode=="" && errorstate==""){
            
            if(encryptStorage.getItem("user").userid==undefined){
                 data1={id:encryptStorage.getItem("user")._id,address:address,pincode:pincode,city:city,state:state,country:country}
            }
            history.goBack()
            addAddress(data1).then(data=>{
                //console.log(data)
            })
        }
        else{
            swal.fire("errro in input feilds.")
        }
    }
    return (
        <div>
            <h1>Add New Address</h1>
            <Container>
                <Form onSubmit={submit}>
                <Form.Group controlId="address" style={{margin:"20px"}}>
                        <Form.Control as="textarea" rows="3" name="address"  placeholder='Address'onChange={handler} autoComplete='none'/>
                        <p style={{color:"red"}}>{errroraddress}</p>
                    </Form.Group>
                    <Form.Group controlId="pincode" style={{margin:"20px"}}>
                        <Form.Control  type="number" name="pincode"  placeholder='Pincode' onChange={handler} autoComplete='none'/>
                        <p style={{color:"red"}}>{errorpincode}</p>
                    </Form.Group>
                    <Row>
                        <Col>
                        <Form.Group controlId="city" style={{margin:"20px"}}>
                        <Form.Control  name="city"  placeholder='City' onChange={handler} autoComplete='none'/>
                        <p style={{color:"red"}}>{errorcity}</p>
                    </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="state" style={{margin:"20px"}}>
                        <Form.Control  name="state"  placeholder='State' onChange={handler} autoComplete='none'/>
                        <p style={{color:"red"}}>{errorstate}</p>
                    </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="country" style={{margin:"20px"}}>
                        <Form.Control  name="country"  placeholder='Country' onChange={handler} autoComplete='none'/>
                        <p style={{color:"red"}}>{errorcountry}</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Addaddress
