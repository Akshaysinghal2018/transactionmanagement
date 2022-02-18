import React, { useState, useEffect } from 'react'
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { getproducts, getcategory, getproductsbyid, getcolor,getproductsbyidcolor } from '../../Services/productservices'
import Cardcmp from '../Dashboard/Cardcmp'
import '../Dashboard/index.css'
import ReactPaginate from 'react-paginate';

function Productdetail() {
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

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        if(sortrating==0){

            getproducts().then(data => {
                setproducts(data.data.data);
                setCurrentItems(data.data.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
            })
        }
        getcategory().then(data => {
            //console.log(data.data.data)
            setcategory(data.data.data)
        })
        getcolor().then(data => {
            console.log(data.data.data)
            setcolor(data.data.data)
        })

    }, [itemOffset, itemsPerPage,sortrating]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % 30;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const handler = (e) => {
        const id = e.target.id;
        const endOffset = itemOffset + itemsPerPage;
        //alert(e)
        if (e.target.value == "all") {
            getproducts().then(data => {
                setproducts(data.data.data);
                setCurrentItems(data.data.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
            })
        }
        else {
            getproductsbyid(e.target.value).then(data => {
                //alert(e)
                setproducts(data.data.data);
                setCurrentItems(data.data.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
            })
        }
    }
    const handlercolor = (e) => {
        const id = e.target.id;
        const endOffset = itemOffset + itemsPerPage;
        //alert(e.target.value)
        if (e.target.value == "all") {
             getproducts().then(data => {
                setproducts(data.data.data);
                 setCurrentItems(data.data.data.slice(itemOffset, endOffset));
                 setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
             })
        }
        else {
            getproductsbyidcolor(e.target.value).then(data => {
                //alert(e)
                setproducts(data.data.data);
                setCurrentItems(data.data.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
            })
        }
    }
    //
    //console.log(category)
    const sortbyrating=()=>{
        var data=currentItems
        data.sort((a, b) => {
            return a.product_rating - b.product_rating;
        });
        console.log(data)
        setcoloritem(data)
        setsortrating(Math.random())
    }
    const sortbyincresingcost=()=>{
        var data=currentItems
        data.sort((a, b) => {
            return a.product_cost - b.product_cost;
        });
        console.log(data)
        setcoloritem(data)
        setsortrating(Math.random())
    }
    const sortbydecresingcost=()=>{
        var data=currentItems
        data.sort((a, b) => {
            return b.product_cost - a.product_cost;
        });
        console.log(data)
        setCurrentItems(data)
        setsortrating(Math.random())
    }
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
              setCurrentItems(data1.slice(itemOffset, endOffset));
        }
          setsortrating(Math.random())

    }
    return (
        <div>
        <div style={{ textAlign: "center", marginTop: "20px" }} >
            <h1>All Product</h1>
            <input placeholder="Search" onChange={filterdata} />
            <Row>
                <Col lg={2} md={2} sm={2} style={{ borderRight: "2px solid black" }}>
                    <p>View All</p>
                    <select id="category" name="category" onChange={handler} className="dropdowncss">
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
                    <select id="color" name="color" onChange={handlercolor} className="dropdowncss">
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
                        <div style={{position:"absolute",right:"150px",display:"flex"}}>
                            <h4>Sort By:</h4><button type='button' style={{border:"0",backgroundColor:"white"}} onClick={sortbyrating}><i className='fa fa-star' style={{color:"blue"}}></i></button>
                            <h4 style={{marginLeft:"20px"}}>₹</h4><button type='button' style={{border:"0",backgroundColor:"white"}} onClick={sortbyincresingcost} ><i className='fa fa-arrow-up' style={{color:"blue"}}></i></button>
                            <h4 style={{marginLeft:"20px"}}>₹</h4><button type='button' style={{border:"0",backgroundColor:"white"}} onClick={sortbydecresingcost}><i className='fa fa-arrow-down' style={{color:"blue"}}></i></button>
                            
                        </div><br/><br/>
                    <Row>
                        {
                            currentItems.map((item, index) => {
                                return (
                                    <Col xs={3} lg={3} md={4} sm={6} className='cardcss' key={index}>
                                        <Cardcmp name={item.product_name} price={item.product_cost} rating={item.product_rating} image_url={item.product_subImages[0]} id={item._id} producer={item.product_producer} />
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

export default Productdetail
