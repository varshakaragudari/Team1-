import React from 'react'
import NatWestlogo from "../images/image.png";
import {Link} from 'react-router-dom';
import '../css/Sidebar.css';

function Sidebar(props) {
  
  return (
    <>
      <div className='d-md-none d-sm-block'>
        <div className="dropdown">
          <button className="btn btn-outline-primary w-100 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.currentPage}
          </button>
          <div className="dropdown-menu w-100 p-4" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/banking">Dashboard</a>
            <a className="dropdown-item" href="/banking/transactions">Transactions</a>
            {/* <a className="dropdown-item" href="/banking/notifications">Notifications</a> */}
            <a className="dropdown-item" href="/banking/payment">Make Payment</a>
            <a className="dropdown-item" href="/banking/settings">Settings</a>
            <a className="dropdown-item" href="/helpdesk">Helpdesk</a>
            <hr/>
            <a className="dropdown-item" href="/banking/my-account">My Profile</a>
          </div>
        </div>
      </div>
      <div className='sidebar-responsive d-none d-md-block' id="show-sidebar-list" aria-labelledby="show-sidebar-list">
        <div class="p-3 text-secondary bg-light main-container2 d-flex justify-content-between flex-column">
          <div>
            <div class="d-flex justify-content-center flex-row flex-wrap">
              <img src={NatWestlogo} class='NatwestImg' alt='natwest logo'/>
              <h3  class="d-flex align-items-center mx-auto mt-2 mb-3 mb-md-0 me-md-auto text-secondary text-decoration-none">Natwest</h3>
            </div>
            <hr/>
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="nav-item my-2">
                <Link to="/banking" className='nav-link text-secondary text-decoration-none'><strong>Dashboard</strong></Link>
              </li>
              <li class="nav-item my-2">
              <Link to="/banking/transactions" className='nav-link text-secondary text-decoration-none'><strong>Transactions</strong></Link>
              
              </li>
              <li class="my-2">
                <Link to="/banking/payment" className='nav-link text-secondary text-decoration-none'><strong>Make Payment</strong></Link>
              </li>
              {/* <li class="nav-item my-2">
              <Link to="/banking/notifications" className='nav-link text-secondary text-decoration-none'><strong>Notifications</strong></Link>
              
              </li> */}
              <li class="my-2"> 
                <Link to="/banking/settings" className='nav-link text-secondary text-decoration-none'><strong>Settings</strong></Link>
              </li>
              <li class="my-2">
                <Link to="/helpdesk" className='nav-link text-secondary text-decoration-none'><strong>Helpdesk</strong></Link>
              </li>
            </ul>
          </div>
          <div className='d-flex justify-content-between flex-column'>
            
            <hr/>
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="my-2">
                <Link to="/banking/my-account" style={{textDecoration:"none"}}><a href="/my-account" class="nav-link text-secondary" aria-current="page">
                <strong>My Profile</strong>
                </a></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

