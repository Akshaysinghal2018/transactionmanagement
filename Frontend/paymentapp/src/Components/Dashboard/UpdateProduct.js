import React, { useEffect, useState } from 'react'
import { Container, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import swal from 'sweetalert2'

function UpdateProduct({pname,pdesc,pimage,pcost,pstock}) {
    console.log({pname,pdesc,pimage,pcost,pstock})
    const [product_name, setproduct_name] = useState(pname)
    const [product_image, setproduct_image] = useState(pimage)
    const [product_desc, setproduct_desc] = useState(pdesc)
    const [product_cost, setproduct_cost] = useState(pcost)
    const [product_stock, setproduct_stock] = useState(pstock)
    
    useEffect(() => {
      
    }, [])
    
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
                    "type": "formData"

                }
            }
            axios.post('http://localhost:8899/api/addproduct', formData, config).then(
                data => {
                    //console.log(data.data.message)
                    if (data.data.err =="0") {
                        swal.fire(data.data.message)
                        window.location.replace("/dashboard")
                    }
                    else {
                        //console.log(data)
                        swal.fire(data.data.err)
                        //window.location.reload()
                    }
                }
            )
        }
        else {
            swal.fire("cannot be empty feilds.")
        }
    }

    return (
        <div>
            <div>
                <Container style={{ border: "2px solid black", marginTop: "20px", padding: "20px" }}>
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="productname">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name" onChange={handler} defaultValue={pname} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productimage">
                            <Form.Label>Product image</Form.Label>
                            <Form.Control type="file" placeholder="Product image" onChange={handler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productdescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product description" onChange={handler} defaultValue={pdesc}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productcost">
                            <Form.Label>Product Cost</Form.Label>
                            <Form.Control type="number" placeholder="Enter Product Cost" onChange={handler} defaultValue={pcost}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productstock">
                            <Form.Label>Product Stock</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Stock" onChange={handler} defaultValue={pstock}/>
                            </Form.Group>
                            
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default UpdateProduct