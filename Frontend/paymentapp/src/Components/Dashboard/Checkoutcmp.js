import React from 'react'
import {Row,Col, Container,Button,Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { getUser,deleteAddress, checkout } from '../../Services/services'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { useDispatch } from 'react-redux'
import { getCart,removecart } from '../../Services/services'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { authenticatetoken } from '../../Services/productservices'
import swal from 'sweetalert2'

function Checkoutcmp() {
    const [address, setaddress] = useState([])
    const [paymentmethod, setpaymentmethod] = useState("paybycash")
    const [addressvalue, setaddressvalue] = useState("")
    
    const [cart, setcart] = useState([])
  const [subtotal, setsubtotal] = useState(0)
  const [gst, setgst] = useState(0)
  const [state, setstate] = useState(0)
  const dispatch = useDispatch()
  
  const  history =useHistory()
  useEffect(() => {
    //console.log(encryptStorage.getItem('user'))
    // getCart({email:encryptStorage.getItem('user').email}).then(data=>{
      if(encryptStorage.getItem("user")==undefined){
        window.location.replace("/login")
      }
        authenticatetoken().then(data=>{
            if(data.data.err=="token"){
                swal.fire(data.data.msg)
                window.location.replace("/logout")
            }
        })
    setcart(encryptStorage.getItem("cart"))
      //console.log(data)
      //encryptStorage.setItem("cart",)
    //})
    var sumitem=0
    encryptStorage.getItem("cart").map((item)=>{
      sumitem=sumitem+item.quantity*item.price
    })
    setsubtotal(sumitem)
    setgst(Math.floor(sumitem*0.05))
    var id=encryptStorage.getItem("user").userid
    if(id==undefined){
        id=encryptStorage.getItem("user")._id
    }
    const data1={userid:id}
    //console.log(data1)
    getUser(data1).then(data=>{
        console.log(data)
        if(data.data[0].Address.length==0){
          swal.fire("add address")
          history.push('/addaddress')
        }
        setaddress(data.data[0].Address)
    })
  }, [state])
    const handler=(e)=>{
      console.log(e.target.value)
      if(e.target.id=="address"){
        address.map((item,index)=>{
          console.log(e.target.value==index)
            if(index==e.target.value){
              console.log(item)
                setaddressvalue(item)
            }
        })

      }
      else{
        setpaymentmethod(e.target.value)
      }
    }
    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  }

  async function displayRazorpay() {
    if(addressvalue==""){
      swal.fire("select address")
    }
    else{

    
    if(paymentmethod=="paybycash"){
      const email=encryptStorage.getItem("user").email
      const order_data=encryptStorage.getItem("cart")
      console.log(address)
      console.log(order_data)
      if(address=="" || paymentmethod==""){
        swal.fire("select details")
      }
      else{

        checkout({email:email,order_data:order_data,address:addressvalue,paymentmethod:paymentmethod}).then(data=>{

          swal.fire("order completed")
          window.location.replace('/dashboard')
          
          removecart({email:encryptStorage.getItem('user').email}).then(data=>
            console.log(data))
        encryptStorage.setItem('cart',[])
        })
      }
    }
    else{
      const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
          swal.fire("Razorpay SDK failed to load. Are you online?");
          return;
      }

      const result = await axios.post("http://localhost:8899/api/paymentroute",{amount:subtotal*100});

      if (!result) {
          swal.fire("Server error. Are you online?");
          return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
          key: "rzp_test_OJD4szMjTepByk", // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: encryptStorage.getItem("user").first_name+encryptStorage.getItem("user").last_name,
          description: " Transaction",
          image: "{ logo }",
          order_id: order_id,
          handler: async function (response) {
              const data = {
                email:encryptStorage.getItem("user").email,order_data:encryptStorage.getItem("cart"),address:addressvalue,paymentmethod:paymentmethod,
                  orderCreationId: order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
              };

              const result = await axios.post("http://localhost:8899/api/paymentsuccess", data);
              console.log(result)
              swal.fire(result.data.msg);
                    window.location.replace('/dashboard')
                    
                    removecart({email:encryptStorage.getItem('user').email}).then(data=>
                      console.log(data))
                  encryptStorage.setItem('cart',[])
          },
          prefill: {
              name: encryptStorage.getItem("user").first_name+encryptStorage.getItem("user").last_name,
              email: encryptStorage.getItem("user").email,
              contact: encryptStorage.getItem("user").phone_no,
          },
          notes: {
              address: addressvalue,
          },
          theme: {
              color: "#61dafb",
          },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }
  }

    
    return (
        <div style={{margin:"20px"}}>
            <Row>
                <Col lg={4} md={6} sm={12} style={{borderRight:"2px solid black"}}>
                    <h4>Address</h4>
                    {
                        address.map((item,index)=>{
                            return(<div style={{border:"2px solid black",padding:"20px",borderRadius:"5px",marginTop:"20px",display:"flex"}} key={index}>
                        <input type="radio" id="address" name="address" value={index} onChange={handler}  style={{margin:"20px"}}/><div>

                            <p>{item.address}</p>
                            <div style={{display:'flex'}}>
                            <p style={{marginRight:"20px"}}>{item.city}</p>
                            <p style={{marginRight:"20px"}}>{item.state}</p>
                            <p style={{marginRight:"20px"}}>{item.country}</p>
                            <p >{item.pincode}</p>
                        </div>
                        </div>
                            </div>)
                        })
                    }
                    <h4 style={{marginTop:"20px"}}>Payment Method</h4>
                    <div>
  <input type="radio" id="paymentmethod" name="paymentmethod" value="paybycash" onChange={handler}
         defaultChecked />
  <label htmlFor="huey" style={{marginLeft:"20px"}}>paybycash</label>
</div><div>
  <input type="radio" id="paymentmethod" name="paymentmethod" value="paybycard" onChange={handler}
          />
  <label htmlFor="huey" style={{marginLeft:"20px"}}>paybycard</label>
</div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <Container>
                <h1>Review Order</h1>
            <Table striped bordered hover>
  <thead>
    <tr>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Subtotal</td>
      <td>{subtotal}</td>
    </tr>
    <tr>
      <td>GST(5%)</td>
      <td>{gst}</td>
    </tr>
    <tr>
      <td>Subtotal</td>
      <td >{subtotal+gst}</td>
    </tr>
  </tbody>
</Table>
  <Button variant={"primary"} style={{width:"100%"}} onClick={displayRazorpay}>Proceed To Buy</Button>
                </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Checkoutcmp
