import React, { useState } from 'react';
import '../css/EditProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


const EditProfile = () => {
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  // const [userData, setUserdata]=useState([]);
  const [userId,setUserId]=useState("");
  const [custId,setCustId]=useState("");
  const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const handleCloseDialog = () => {
        
            setShowDialog(false);
        
    };
  
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    country: userData.country,
    phone: userData.phoneNumber,
    email: userData.email,
    bio: '',
    userPhoto: '',
    dateOfBirth: formatDateFromMilliseconds(userData.dob)
  });
  
  useEffect(()=>{
    // getallData();
    setCustId(userData.custId);

  },[])
  async function getallData(){
    await axios.get(`http://localhost:8999/users/api/users/updateInfo/?custId=${custId}&firstName=${formData.firstName}`);
  }
  function formatDateFromMilliseconds(millisecondsStr) {
    const milliseconds = parseInt(millisecondsStr, 10); // Convert the string to a number
    if (isNaN(milliseconds)) {
      return "Invalid Date";
    }
  
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const [formErrors, setFormErrors] = useState({

  });
  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    country: userData.country,
    phone: userData.phoneNumber,
    email: userData.email,
    bio: '',
    userPhoto: '',
    dateOfBirth: formatDateFromMilliseconds(userData.dob)
    });
    setShowDialog(true);
            setDialogMessage('Your update is cancelled');

  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          userPhoto: event.target.result, 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setFormData({
      ...formData,
      userPhoto: '', // Clear the user photo
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (Object.keys(validationErrors).length === 0) {
        console.log('Form data:', formData);
        // alert('Your profile has been updated.');
        setShowDialog(true);
            setDialogMessage('Your profile has been updated.');
      } else {
        setFormErrors(validationErrors);
      }
    console.log(formData);
  };

  return (
    <>
      <Helmet>
            <title>Edit Profile - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="Edit Profile"/>
            </div>
            <div className="col-lg-10 m-0 p-0">
              <div className="profile">
                <nav aria-label="breadcrumb" className='p-2'>
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/banking/my-account" className='prim-colr'>My Account</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Profile</li>
                        </ol>
                </nav>
                <h2 className="personal-info-heading">Personal Information</h2> <br />
                <div className="user-photo">
                  <label htmlFor="photoUpload" className="user-photo-label">
                    {formData.userPhoto ? (
                      <>
                        <div className="d-flex align-items-center">
                          <img
                            src={formData.userPhoto}
                            alt="User"
                            className="user-photo-img"
                          />
                          <div className="d-flex align-items-center ml-2">
                            <button
                              type="button"
                              className="btn btn-danger delete-photo-btn"
                              onClick={handleDeletePhoto}
                            >
                              Delete
                            </button>
                            <span className='change'>
                            <label
                              htmlFor="photoUpload"
                              className="btn btn-primary ml-2 change-photo-btn"
                            >
                              Change Your Photo
                            </label>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                          <label
                            htmlFor="photoUpload"
                            className="btn btn-primary mx-2 upload-photo-btn"
                          >
                            Upload Your Photo
                          </label>
                        </div>
                      </>
                    )} 
                    
                    <input
                      type="file"
                      accept="image/jpeg"
                      id="photoUpload"
                      name="userPhoto"
                      onChange={handlePhotoChange}
                      className="user-photo-input"
                    />
                  </label>
                </div>

              <br></br> <br></br>
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control small-input"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="lastName" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control small-input"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                          <div className='col'>
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          
                          required
                        />
                        </div>
                        <div className='col'>
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date Of Birth (dd-mm-yyyy)
                        </label>
                        <input
                    type="text"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="state" className="form-label">
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="country" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
              <h2 className='contact'>Contact Information</h2>
                      <div className="row mb-3">
                          <div className='col'>
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control small-input"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          Bio
                        </label>
                        <textarea
                          className="form-control"
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="d-flex">
                <button type="submit" className="btn min btn-primary ">
                  Save
                </button> 
                <LoginDialog show={showDialog} handleClose={handleCloseDialog} message={dialogMessage} />
                <span className='cancel'>
                <button type="button" className="btn dan btn-danger" onClick={handleCancel}>
                  Cancel
                </button> </span>
                <LoginDialog show={showDialog} handleClose={handleCloseDialog} message={dialogMessage} />
              </div>
                    </form>
              </div>
              <br/><br/>
              <OneLineFooter/>
            </div>
      </div>

    </>
  );
};

export default EditProfile;




export function LoginDialog(props) {
  const { show, handleClose, message } = props;

  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Body>
              <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal>
  );
}



