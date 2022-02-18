import React from 'react'
import {Row,Col,Table,Container,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { useDispatch } from 'react-redux'
import { getCart, updateCart } from '../../Services/services'
import { useHistory } from 'react-router-dom';

function Cartcmp() {
  const [cart, setcart] = useState([])
  const [subtotal, setsubtotal] = useState(0)
  const [gst, setgst] = useState(0)
  const [state, setstate] = useState(0)
  const [paymentmethod, setpaymentmethod] = useState("paybycash")
  const dispatch = useDispatch()
  const history=useHistory()
  useEffect(() => {
    console.log(encryptStorage.getItem('user'))
    if(encryptStorage.getItem('user')==undefined){
      setcart(encryptStorage.getItem('cart'))
    }
    
    else{
    
      // getCart({email:encryptStorage.getItem('user').email}).then(data=>{
      //   console.log(data)
      //   setcart(data.data.data[0].cart_data)
      //   encryptStorage.setItem("cart",data.data.data[0].cart_data)
      // })
      setcart(encryptStorage.getItem("cart"))
    }
    var sumitem=0
    encryptStorage.getItem("cart").map((item)=>{
      sumitem=sumitem+item.quantity*item.price
    })
    setsubtotal(sumitem)
    setgst(Math.floor(sumitem*0.05))
  }, [state])
  const incrementquantity=(e)=>{
    const id=e.target.id;
    var data1=encryptStorage.getItem("cart")
    data1[id].quantity=data1[id].quantity+1
    encryptStorage.setItem("cart",data1)
    setstate(Math.random())
    updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
      console.log(data))
  }
  const decrementquantity=(e)=>{
    const id=e.target.id;
    var data1=encryptStorage.getItem("cart")
    if(data1[id].quantity==1){
      removeitem(id)
    }
    else{
      data1[id].quantity=data1[id].quantity-1
      encryptStorage.setItem("cart",data1)
      setstate(Math.random())
      updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
        console.log(data))
    }
  }
  const removeitem=(id)=>{
    var data1=encryptStorage.getItem("cart")
    data1.splice(id,1)
    encryptStorage.setItem("cart",data1)
    setstate(Math.random())
    updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
      console.log(data))
    dispatch({type:'Dec_count'})
  }
  const submit=()=>{
    if(encryptStorage.getItem("user")==undefined){
      history.push('/login')
    }
    else{
      history.push('/checkout')
    }
  }
    return (
        <>
        <Container>
            <Row>
                <Col lg={7} md={7} sm={12}>
                <Table striped bordered hover>
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantiy</th>
      <th>Price</th>
      <th>Total</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
      cart.map((item,index)=>{
        return(
    <tr>
      <td>
        <Row>
          <Col lg={6}>
            <img src={item.image_url} alt="logo" style={{width:"120px" ,height:"120px"}}/>
          </Col>
          <Col lg={6} style={{fontSize:"12px"}}>
            <p>{item.name}</p>
            <p>{item.producer}</p>
            <Row>
            <Col>
            <p>Status: </p>
            </Col>
            <Col>
            <p style={{fontSize:"16px",color:"green",marginLeft:"-20px"}}>{item.Status}</p>
            </Col>
            </Row>
          </Col>
        </Row>
      </td>
      <td><Row style={{padding:"5px"}}>
        <Col lg={4}>
        <Button variant={"danger"} style={{borderRadius:"50%",marginTop:"50%"}} id={index} onClick={decrementquantity} >-</Button>
        </Col>
        <Col lg={4} style={{marginTop:"12%",textAlign:"center"}}>
        <h4>{item.quantity}</h4>
        </Col>
        <Col lg={4}>
        <Button variant={"danger"} style={{borderRadius:"50%",marginTop:"50%"}} id={index} onClick={incrementquantity}>+</Button>
        </Col></Row></td>
      <td><h4>{item.price}</h4></td>
      <td><h4>{item.price*item.quantity}</h4></td>
      <td><Button variant='danger' onClick={()=>removeitem(index)}><i class="fa fa-trash"></i></Button></td>
    </tr>
        )
      })
    }
    
  </tbody>
</Table>
                </Col>
            <Col lg={5} md={5} sm={12}>
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
  <Button variant={"primary"} style={{width:"100%"}} onClick={submit}>Proceed To Buy</Button>
            </Col>
            </Row>
        </Container>
        </>
    )
}

export default Cartcmp
