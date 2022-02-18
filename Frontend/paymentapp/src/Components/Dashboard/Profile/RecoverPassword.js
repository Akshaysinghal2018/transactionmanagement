import React from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import {updatepassworduser,forgetpassworduser} from '../../../Services/services'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react'
import {validateemail, validatename,validatemobile,validatepassword} from '../../Validations/validation'
import swal from 'sweetalert2'
function RecoverPassword(props) {
    const [secretcode, setsecretcode] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [alertdata, setalertdata] = useState("  ")
    const [errorpassword, seterrorpassword] = useState("")
    const [errorconfirmpassword, seterrorconfirmpassword] = useState("")
    const query = new URLSearchParams(useLocation().search);
    const [timer, settimer] = useState(<></>)
    const getOTP=()=>{
        forgetpassworduser({email:encryptStorage.getItem("user").email}).then(data=>{ 
        })
        setalertdata("Verification Code Has been sent to your registered Email ID.")
        document.getElementById("otpbtn").disabled=true;
        document.getElementById("timerdiv").innerHTML='Verfication Code  Expired in  <span id="timer">05:00</span>'
        startTimer()
    }
    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if(m==0 && s==0){

            document.getElementById("otpbtn").disabled=false;
            document.getElementById("timerdiv").innerHTML=""
            return
        }
        if(s==59){m=m-1}
        if(m<0){
          return
        }
        
        document.getElementById('timer').innerHTML =
          m + ":" + s;
        //console.log(m)
        setTimeout(startTimer, 1000);
        
      }
      
      function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
        if (sec < 0) {sec = "59"};
        return sec;
      }
    const handler=(e)=>{
        
        if(e.target.id=="verificationcode"){
            setsecretcode(e.target.value)
        }
        if(e.target.id=="password"){
            setpassword(e.target.value)
            seterrorpassword(validatepassword(e.target.value))
        }
        if(e.target.id=="confirmpassword"){
            setconfirmpassword(e.target.value)
            if(password!=e.target.value){
                seterrorconfirmpassword("password and confirm pasword not same.")
            }
            else{
                seterrorconfirmpassword("")
            }
        }
    }
    const submit=(e)=>{
        e.preventDefault()
        if(errorpassword == "" && errorconfirmpassword == "" && secretcode != ""){
            updatepassworduser({email:encryptStorage.getItem("user").email,secretcode:secretcode,password:password}).then(data=>{
                if(data.data.success==false){
                    swal.fire(data.data.message)
                    if(data.data.message == "token expire"){
                       
                    }
                }
                else{
                    swal.fire(data.data.message)
                    window.location.replace("/login")
                }
            })
        }
        else{
            swal.fire("invalid data.")
        }
    }
    return (
        <div>
            <Container style={{textAlign:"center"}}>
                    <h1>Recover Password</h1>
                <Form onSubmit={submit} style={{width:"50%",marginLeft:"25%",border:"2px solid black",padding:"20px"}}>
                    <p style={{ color: "red",textAlign:"center" }}><i className="fa fa-info-circle" aria-hidden="true"></i>
{alertdata}</p>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Verification Code" id="verificationcode" onChange={handler} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="password" placeholder="Enter New Password." id="password" onChange={handler} />
                    </Form.Group>
                    <p style={{color:"red"}}>{errorpassword} </p>
                    <Form.Group className="mb-3" >
                        <Form.Control type="password" placeholder="Enter Coffirm Password" id="confirmpassword" onChange={handler} />
                    </Form.Group>
                    <p style={{color:"red"}}>{errorconfirmpassword} </p>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button onClick={getOTP} style={{marginLeft:"20px"}} variant={"danger"} id="otpbtn">GetOtp</Button><div id="timerdiv"></div>
                </Form>
            </Container>
        </div>
    )
}

export default RecoverPassword
