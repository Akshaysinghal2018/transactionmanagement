import React, { useState, useEffect } from 'react'
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import Crouselcmp from './Crouselcmp'
import { getproducts, getcategory, getproductsbyid, getcolor,getproductsbyidcolor, authenticatetoken } from '../../Services/productservices'
import Cardcmp from './Cardcmp'
import './index.css'
import ReactPaginate from 'react-paginate';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import swal from 'sweetalert2';

function Bodycmp() {
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

    useEffect(() => {
        
        const endOffset = itemOffset + itemsPerPage;
        console.log(encryptStorage.getItem("user"))
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
            setproducts(item.data.data)
                setCurrentItems(item.data.data)
        })
    },[]
        
        )
        
        
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % 30;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const filterdata=(e)=>{
        const query=e.target.value
        const endOffset = itemOffset + itemsPerPage;
        var data1=products
        if(query ===  ""){
            setCurrentItems(products.slice(itemOffset, endOffset));
        }
        else{

            data1=data1.filter(post => {
                if (e.target.value === "") {
                    console.log("not include")
                  //if query is empty
                  return post;
                } else if (post.product_name.toLowerCase().includes(query.toLowerCase())) {
                    console.log("include")
                  //returns filtered array
                  return post;
                }
              });
              console.log(query)
              console.log(data1)
              setCurrentItems(data1);
        }
          setsortrating(Math.random())

    }
    return (
        <div>
            <Crouselcmp />
            <div style={{ textAlign: "center", marginTop: "20px" }} >
                <h1>Popular Product</h1>
                <input placeholder="Search" onChange={filterdata} />
                <Row>
                    <Col lg={2} md={2} sm={2} style={{ borderRight: "2px solid black" }}>
                        <p>View All</p>
                        <select id="category" name="category"  className="dropdowncss">
                        <option value="all">Categories</option>
                            <option value="all">All</option>
                            {
                                category.map((item, index) => {
                                    return (

                                        <option key={index} eventKey={item.category_name} value={item.category_name}>{item.category_name} </option>
                                    )
                                })
                            }
                        </select>
                        <select id="color" name="color"  className="dropdowncss">
                        <option value="all">Colors</option>
                            <option value="all">All</option>
                            {
                                color.map((item, index) => {
                                    return (

                                        <option key={index} eventKey={item._id} value={item._id}>{item.color_name} </option>
                                    )
                                })
                            }
                        </select>

                    </Col>
                    <Col lg={9} md={9} sm={9} style={{ padding: "20px" }}>
                           
                        <Row>
                            {
                                currentItems.map((item, index) => {
                                    return (
                                        <Col xs={3} lg={3} md={4} sm={6} className='cardcss' key={index}>
                                            <Cardcmp name={item.product_name} price={item.product_cost}  image_url={`http://localhost:8899/images/${item.product_image}`} id={item._id} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
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

export default Bodycmp
