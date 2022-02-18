import React, { useState, useEffect } from 'react'
import { Container, Row, Col, DropdownButton, Dropdown ,Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import './Dashboard/index.css'
import ReactPaginate from 'react-paginate';
import { encryptStorage } from '../ConfigFiles/EncryptStorage'
import { authenticatetoken, deleteproduct, getproducts, updateproduct } from '../Services/productservices';
import Crouselcmp from './Dashboard/Crouselcmp';
import Cardcmp from './Dashboard/Cardcmp';
import {Card} from 'react-bootstrap'
import UpdateProduct from './Dashboard/UpdateProduct';
import AddProduct from './Dashboard/AddProduct';
import axios from 'axios'
import swal from 'sweetalert2'

function AdminCrud() {
    const [products, setproducts] = useState([])
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [itemsPerPage, setitemsPerPage] = useState(8) //

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [category, setcategory] = useState([])
    const [categoryitem, setcategoryitem] = useState("all")
    const [color, setcolor] = useState([])
    const [coloritem, setcoloritem] = useState("all")
    const [sortrating, setsortrating] = useState(0)
    const [user, setuser] = useState({})
    const [updateform, setupdateform] = useState(<AddProduct status="add" data={{}}/>)
    const [product_name, setproduct_name] = useState("")
    const [product_image, setproduct_image] = useState("")
    const [product_desc, setproduct_desc] = useState("")
    const [product_cost, setproduct_cost] = useState("")
    const [product_stock, setproduct_stock] = useState("")
    const [changebutton, setchangebutton] = useState(<Button variant="primary" type="submit">Submit</Button>)
    var data2=<AddProduct status="add" data={{}}/>
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if(encryptStorage.getItem("user")!=undefined){

            authenticatetoken().then(data=>{
                if(data.data.err=="token"){
                    alert(data.data.msg)
                    window.location.replace("/logout")
                }
            })
        }
        if(encryptStorage.getItem('cart')==undefined){

            encryptStorage.setItem('cart',[])
        }
    
        else{
            
            setuser(encryptStorage.getItem("user"))
        }
        getproducts().then(item=>{
            console.log(item)
            setproducts(item.data.data)
                setCurrentItems(item.data.data)
        })
    },[]
        
        )
        const handler = (e) => {
          // console.log(e.target.id)
           if (e.target.id == "productname") {
               setproduct_name(e.target.value)
           }
           if(e.target.id=="productdescription") {
               setproduct_desc(e.target.value)
           }
           if(e.target.id=="productcost") {
               setproduct_cost(e.target.value)
           }
           if(e.target.id=="productstock") {
               setproduct_stock(e.target.value)
           }
       }
       const submit = (e) => {
           e.preventDefault()
           if (product_name != "" && product_desc != "" && product_cost !="" && product_stock !="" ) {
               const data = {  }
   
               let formData = new FormData();    //formdata object
               var imagedata = document.querySelector('input[type="file"]').files[0];
               formData.append("myfile", imagedata);
               formData.append('pname', product_name);   //append the values with key, value pair
               formData.append('pdesc', product_desc);
               formData.append('pcost', product_cost);
               formData.append('pstock', product_stock)
               const config = {
                   headers: {
                       "Content-Type": "multipart/form-data; boundary=AaB03x" +
                           "--AaB03x" +
                           "Content-Disposition: file" +
                           "Content-Type: png" +
                           "Content-Transfer-Encoding: binary" +
                           "...data... " +
                           "--AaB03x--",
                       "Accept": "application/json",
                       "type": "formData",
                       'Authorization': 'Bearer ' + encryptStorage.getItem('token')
   
                   }
               }
               axios.post('http://localhost:8899/api/addproduct', formData, config).then(
                   data => {
                       //console.log(data.data.message)
                       if(data.data.err=="token"){
                        swal.fire(data.data.msg)
                        window.location.replace("/logout")
                       }
                       else{

                         if (data.data.err =="0") {
                             swal.fire(data.data.message)
                             window.location.reload("")
                         }
                         else {
                             //console.log(data)
                             swal.fire(data.data.err)
                             //window.location.reload()
                         }
                       }
                   }
               )
           }
           else {
               swal.fire("cannot be empty feilds.")
           }
       }
       const updatesubmit = (id) => {
        //e.preventDefault()
        if (1) {
            const data = {  }

            let formData = new FormData();    //formdata object
            var imagedata = document.querySelector('input[type="file"]').files[0];
            if(1){

              formData.append("myfile", imagedata);
              formData.append('pname', document.getElementById("productname").value);   //append the values with key, value pair
              formData.append('pdesc', document.getElementById("productdescription").value);
              formData.append('pcost', document.getElementById("productcost").value);
              formData.append('pstock', document.getElementById("productstock").value);
              formData.append('pid', id);
  
              const config = {
                  headers: {
                      "Content-Type": "multipart/form-data; boundary=AaB03x" +
                          "--AaB03x" +
                          "Content-Disposition: file" +
                          "Content-Type: png" +
                          "Content-Transfer-Encoding: binary" +
                          "...data... " +
                          "--AaB03x--",
                      "Accept": "application/json",
                      "type": "formData",
                      'Authorization': 'Bearer ' + encryptStorage.getItem('token')
  
                  }
              }
              axios.post('http://localhost:8899/api/updateproducts', formData, config).then(
                  data => {
                      console.log(data)
                      if(data.data.err=="token"){
                        swal.fire(data.data.msg)
                        window.location.replace("/logout")
                       }
                       
                       else{
                        console.log(data)
                      if (data.data.err =="0") {
                          swal.fire(data.data.message)
                          window.location.reload("")
                      }
                      else {
                          console.log(data)
                          //swal.fire(data.data.err)
                          //window.location.reload()
                      }
                      
                  }
                }
              )
            }
            else {
              swal.fire("cannot be empty feilds.")
          }    
        }
        else {
            swal.fire("cannot be empty feilds.")
        }
    }
        
        
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % 30;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const deleteproducts=(data)=>{
      console.log(data)
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteproduct({id:data}).then(data=>{
              console.log(data)
              if(data.data.success==true){
                  swal.fire(
                    data.data.message,
                    'Your file has been deleted.',
                    'success'
                  )
                window.location.reload("")
              }
            })
        }
      })
    }
    
    const updateproduct=(data)=>{
      setchangebutton(<Button variant="warning" onClick={()=>updatesubmit(data._id)}>Update</Button>)
      
      document.getElementById("productname").value=data.product_name
      setproduct_name(data.product_name)
      document.getElementById("productdescription").value=data.product_desc
      setproduct_desc(data.product_desc)
      document.getElementById("productcost").value=data.product_cost
      setproduct_cost(data.product_cost)
      document.getElementById("productstock").value=data.product_stock
      setproduct_stock(data.product_stock)
    }
    
    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "20px",padding:"70px" }} >
                <h1>Edit Product</h1>
                <Row>
                  <Col xs={8} lg={8} md={6} sm={12}>
                        <Row>
                            {
                              currentItems.map((item, index) => {
                                return (
                                  <Col xs={4} lg={4} md={6} sm={6} className='cardcss' key={index}>
                                           
                                            <Card>
            <Card.Img variant="top" src={`http://localhost:8899/images/${item.product_image}`} width="100%" height="120px" />
            <Card.Body>
                <div style={{height:"70px",borderBottom:"2px solid black"}}>

                <p>{item.product_name}</p>
                </div>
                <Card.Text>
                    <p>
                    Price:{item.product_cost}
                    
                    </p>
                </Card.Text>
                <Button  variant="danger" onClick={()=>deleteproducts(item._id)}>Delete</Button>
                <Button  variant="warning" style={{marginLeft:"20px"}} onClick={()=>updateproduct(item)}>Update</Button>
                
                </Card.Body>
              </Card> 
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        </Col >
              <Col xs={4} lg={4} md={6} sm={12}>
              <Container style={{ border: "2px solid black", marginTop: "20px", padding: "20px" }}>
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="productname">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name" onChange={handler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productimage">
                            <Form.Label>Product image</Form.Label>
                            <Form.Control type="file" placeholder="Product image" onChange={handler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productdescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product description" onChange={handler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productcost">
                            <Form.Label>Product Cost</Form.Label>
                            <Form.Control type="number" placeholder="Enter Product Cost" onChange={handler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productstock">
                            <Form.Label>Product Stock</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Stock" onChange={handler} />
                            </Form.Group>
                            
                            {changebutton}
                    </Form>
                </Container>
              </Col>
                </Row>
                
                <div style={{ display: "flex", }}>

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        className='paginatecss'
                    />
                </div>

            </div>

        </div>
    )
}


export default AdminCrud
