import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
  } from 'reactstrap'
  
  const Header = () => {
    const [open, setOpem] = useState(false)
    const toggle = () => {
      setOpem(!open)
    }
  
    return (
      <div className='App'>
       <div className="container">
        <Navbar color='lignt' light expand='md'>
          <NavbarBrand tag={Link} to='/'> Minhas Series </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink tag={Link} to='/generos'> Genero</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/series'> series</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
       </div>
      </div>
    )
  }
export default Header  