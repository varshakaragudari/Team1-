// src/FeedbackForm.js
import React, { Component } from "react";
import "../css/Feedback.css";
import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Footer from '../components/Footer'
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

class FeedbackForm extends Component {
  constructor() {
    super();
    this.state = {
      userId:null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      selectedOption: "",
      experience: "",
      staffNames: "",
      errors: {},
      showDialog:false,
      dialogMessage:'',
      handleCloseDialog : () => {
        this.setState({showDialog:false});
    }
    };
  }

  componentDidMount() {
    // Fetch user details from the API endpoint to get the userId
    // axios.get('YOUR_API_ENDPOINT_HERE')
    //   .then((response) => {
    //     const userData = response.data; // Assuming the user details are in response.data
    //     const userId = userData.userId; // Extract userId from user data
    //     this.setState({ userId });
    //   })
    //   .catch((error) => {
    //     alert("error while getting userId from endpoint")
    //   });
    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    console.log(this.state);
    console.log(userdata);
    this.setState({userId: userdata.userId});
    console.log(this.state);
  }

  validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      selectedOption,
      experience,staffNames
    } = this.state;
    const errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) errors.email = "Invalid email address";

    const phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) errors.phone = "Invalid phone number";

    if (!address) errors.address = "Address is required";
    if (!selectedOption) errors.selectedOption = "Please select an option";
    if (!experience) errors.experience = "Please share your experience";

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      // Submit the form or perform other actions
      console.log("Form submitted");
  
      // Call the postProducts function to send data to the server
      await this.postProducts();
  
      // Clear the form fields
      e.target.reset();
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  postProducts = async () => {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      address,
      selectedOption,
      experience,
      staffNames,
    } = this.state;
    const userdata = {
      "userId":userId ,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "phone": phone,
      "address": address,
      "type": selectedOption,
      "description": experience,
      "staff": staffNames
    };

    try {
      const response = await axios.post('http://localhost:8031/feedback/feedback', userdata);
      // alert('Your feedback is recieved.');
      this.setState({dialogMessage:"Your feedback is recieved."})
      this.setState({showDialog:true});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { errors } = this.state;
    const hasErrors = Object.keys(errors).length > 0;

    return (
      <>
        <Helmet>
              <title>Feedback - Helpdesk - NatWest Online Banking</title>
        </Helmet>
        <HeaderTop/>
        <div className="d-flex justify-content-center" data-testid="feedback-form"> 
          <div className="main-1">
            <nav aria-label="breadcrumb" className='p-2'>
              <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                  <li className="breadcrumb-item"><a href="/helpdesk" className='prim-colr'>Helpdesk</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Feedback</li>
              </ol>
            </nav>
            
            
            <div className={`feedback-form-container p-2 ${hasErrors ? "error" : ""}`} id="feedback">
              <h1 className="prim-colr">Feedback form</h1>
              <p>* This information must be provided</p>
              <br />
              <form className="feedbackbox p-2" onSubmit={this.handleSubmit}>
                <div className={`form-group ${errors.firstName ? "error" : ""}`}>
                  <label>First Name*{errors.firstName && " !"}</label><br/>
                  <input
                    type="text" className="form-control"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                  {errors.firstName && (
                    <div className="error-message">{errors.firstName}</div>
                  )}
                </div>

                <div className={`form-group ${errors.lastName ? "error" : ""}`}>
                  <label>Last Name*</label><br/>
                  <input type="text" name="lastName" onChange={this.handleChange} className="form-control"/>
                  {errors.lastName && (
                    <div className="error-message">{errors.lastName}</div>
                  )}
                </div>

                <div className={`form-group ${errors.email ? "error" : ""}`}>
                  <label>Email Address*</label><br/>
                  <input type="email" name="email" onChange={this.handleChange} className="form-control"/>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className={`form-group ${errors.phone ? "error" : ""}`}>
                  <label>Phone Number*</label><br/>
                  <input type="text" name="phone" onChange={this.handleChange} className="form-control"/>
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>

                <div className={`form-group ${errors.address ? "error" : ""}`}>
                  <label>Address*</label><br/>
                  <textarea name="address" onChange={this.handleChange} className="form-control"/>
                  {errors.address && (
                    <div className="error-message">{errors.address}</div>
                  )}
                </div>
                
                <div className={`form-group ${errors.selectedOption ? "error" : ""}`}>
                  <label>Tell us what you want to share? *{errors.selectedOption && " !"}</label><br/>
                  <select className="form-control"
                    name="selectedOption"
                    onChange={this.handleChange}
                    value={this.state.selectedOption}
                  >
                    <option value="">Please Select</option>
                    <option value="suggestions">Suggestions</option>
                    <option value="complaints">Complaints</option>
                    <option value="accountrelated">Feedback on accounts related</option>
                    <option value="payments">Feedback on payments</option>
                    <option value="fraud">Fraud</option>
                  </select>
                  {errors.selectedOption && (
                    <div className="error-message">{errors.selectedOption}</div>
                  )}
                </div>


                <div className={`form-group ${errors.experience ? "error" : ""}`}>
                  <label>Please tell us in a detailed way*</label><br/>
                  <textarea name="experience" className="form-control" onChange={this.handleChange} />
                  {errors.experience && (
                    <div className="error-message">{errors.experience}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Name of Staff Member(s)that Helped You</label><br/>
                  <input
                    type="text"
                    name="staffNames" className="form-control"
                    onChange={this.handleChange}
                  />
                  
                </div>

                <button type="submit" className="nextButton">Submit</button>
                <LoginDialog show={this.state.showDialog} handleClose={this.state.handleCloseDialog} message={this.state.dialogMessage} />
              </form>
              <p className="pp1">By completing this form you are agreeing to NatWest using your feedback, including the use of any associated intellectual property rights, and agree that we may contact you in this regard. We may not publish all comments received, but reserve the right to quote from any compliment.</p>
            </div>
          </div>
        </div>
        <br/><br/>
        <Footer/>
      </>
    );
  }
}

export default FeedbackForm;

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
