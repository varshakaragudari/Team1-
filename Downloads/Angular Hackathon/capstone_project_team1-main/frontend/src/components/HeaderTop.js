import React from 'react'
import "../css/HeaderTop.css";
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import useWindowSize from '../pages/UseWindowSize';
import { NavLink, useNavigate } from 'react-router-dom';
import hamburgericon from '../images/Icons/Champion_Hamburger_24x24.svg';
import { useState } from 'react';
import { PropDialog } from './PropDialog';

export default function HeaderTop() {
  const size = useWindowSize(); 
  const navigate = useNavigate()
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [showdi, setShowdi]=useState(false);

  function onLogoutAsk() {
    setShowdi(true);
  }

  function onLogout() {
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div className='cn1'>
      <Navbar expand="md" style={{backgroundColor:'#31004a'}} className="px-4">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
          <img src={hamburgericon} alt="hamburger icon" height={30}/>
        </button>
        <a className='navbar-brand' href='/'><img src="https://www.natwest.com/content/dam/championlogos/Natwest_Secondary_Horizontal_RGB_NEG.svg" alt="NatWest logo" width={100}/> </a>
        <Navbar.Collapse id="basic-navbar-nav" className="mr-auto text-light">
              <Nav className='nav1'>
                <Nav.Link href="#">Personal</Nav.Link>
                <Nav.Link href="#">Premier</Nav.Link>
                <Nav.Link href="#">Business</Nav.Link>
                <Nav.Link href="#">Corporates & Institutions</Nav.Link>
              </Nav>
              
        </Navbar.Collapse>
        <Nav className='nav2 d-flex align-items-center'>
          {
           userData==null && <a href="/login" className="natwest-button-login" id="btn1" style={{backgroundColor:'#31004a',borderColor:'#f6f5f3' }}><span><img src="https://www.natwest.com/etc.clientlibs/responsive/components/foundation/iagloballogin/clientlibs/clientlib_ia_global_login_champion/resources/images/Login-white.svg" alt="" height={15}/></span><span style={{marginLeft:'6px'}}>Login</span></a>
          }
          {
           userData!=null && <button onClick={onLogoutAsk} className="natwest-button-login" id="btn1" style={{backgroundColor:'#31004a',borderColor:'#f6f5f3' }}><span><img src="https://www.natwest.com/etc.clientlibs/responsive/components/foundation/iagloballogin/clientlibs/clientlib_ia_global_login_champion/resources/images/Login-white.svg" alt="" height={15}/></span><span style={{marginLeft:'6px'}}>Logout</span></button>
          }
        </Nav>
      </Navbar>
      <PropDialog show={showdi} message="Are you sure want to logout?" handleClose={()=>setShowdi(false)} handleDo={onLogout}/>
    </div>
  )
}
