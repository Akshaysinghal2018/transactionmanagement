import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button,DropdownButton,Dropdown, Badge } from 'react-bootstrap'
import {LinkContainer,NavLink} from 'react-router-dom'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {useSelector} from 'react-redux'
function Headercmp() {
    const datacmp=encryptStorage.getItem("user")==undefined?<></>:<><Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item>
    <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
    </>
    var datacmp1=<></>
    if(encryptStorage.getItem("user")!=undefined){
    //    console.log(encryptStorage.getItem("user"))
        if(encryptStorage.getItem("user").usertype=="admin"){
            datacmp1= <><Nav.Link as={NavLink} to="/admincrud" style={{marginLeft:"20px",marginRight:"20px"}}>Admin Panel</Nav.Link>
            <Nav.Link as={NavLink} to="/allOrder" style={{marginLeft:"20px",marginRight:"20px"}}>All Order</Nav.Link>
            </>
            
        }
    }
    const count = useSelector(state => state.count)
    return (
        <Navbar bg="light" variant="light" expand="lg" style={{marginBottom:"20px"}}>
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/"> <img
                    alt=""
                    src="/images/logo.jpg"
                    height="40px"
                    width="80px"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', marginLeft: "20%" }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} to="/" style={{marginLeft:"20px",marginRight:"20px"}}>Home</Nav.Link>
                        {datacmp1}
                        <Nav.Link as={NavLink} to="/cart" style={{marginLeft:"20px",marginRight:"20px"}}>Carts <Badge>{count}</Badge></Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav.Link as={NavLink} to="/cart" style={{backgroundColor:"white",color:"black",marginLeft:"20px",marginRight:"20px",borderRadius:"20px"}}><i className='fa fa-shopping-cart'style={{marginRight:"5px"}}></i>Cart</Nav.Link>
                    <DropdownButton id="dropdown-basic-button" title="Contact">
                        <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/register">Register</Dropdown.Item>
                        {datacmp}
                        <Dropdown.Item as={NavLink} to="/aboutus">Aboutus</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Headercmp
