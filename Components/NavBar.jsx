import { useState, useEffect } from 'react'
import Router from 'next/router';
import { Navbar,NavLink, NavItem, NavbarBrand, Nav, Button, NavbarToggler, Collapse } from "reactstrap";
export default function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
   console.log(props.path,"nav")
  }, [])
  
  return (
    
      <Navbar color="secondary" dark expand="md" >
        <NavbarBrand data-testid="heading">TODO</NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          
          <NavItem>
              <NavLink onClick={() => {Router.push('/home')}}>
                Home
              </NavLink>
            </NavItem>
           <NavItem>
              <NavLink onClick={() => {Router.push('/demo')}}>
                Demo
              </NavLink>
          </NavItem>
          
          </Nav>{
            props.path!=="/"?
            <Button color='danger' onClick={() => {
              sessionStorage.clear()
              Router.push('/')
            }}>LogOut</Button>:""}
          
        </Collapse>
      </Navbar>
    
  )
}

